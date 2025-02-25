import * as P2 from 'p2-es';
import {
	createNoise2D,
} from 'simplex-noise';
import * as THREE from 'three';

import {
	Game,
} from './Game';

import type {
	Entity,
} from './Entity';
import type {
	NoiseFunction2D,
} from 'simplex-noise';



export class Stage {

	name: string = 'stage';
	level: number = 0;

	game: Game;
	scene: THREE.Scene;
	world: P2.World;
	noise: NoiseFunction2D;

	entities: Array<Entity> = [];
	private removedEntities: Array<Entity> = [];

	private entitiesByTile: Record<string, Array<Entity>> = {};

	constructor(game: Game) {
		this.game = game;

		this.noise = createNoise2D();

		this.scene = new THREE.Scene();
		this.world = new P2.World({
			gravity: [0, 0],
		});
	}

	add(entity: Entity) {
		this.scene.add(entity.mesh);
		this.world.addBody(entity.body);

		this.entities.push(entity);

		entity.spawn();
	}

	remove(entity: Entity) {
		this.removedEntities.push(entity);
	}

	dispose() {
		for (const entity of this.entities) {
			this.scene.remove(entity.mesh);
			this.world.removeBody(entity.body);
		}
	}

	getEntitiesOnTile(tile: THREE.Vector3) {
		const key = tile.toArray().join(',');

		return this.entitiesByTile[key] ?? [];
	}

	update() {
		this.world.step(Game.step);

		for (const entity of this.entities) {
			if (this.removedEntities.includes(entity)) {
				continue;
			}

			entity.update();
		}

		for (const entity of this.removedEntities) {
			entity.isFlippable = false;
			entity.isDroppable = true;
			this.scene.remove(entity.mesh);
			this.world.removeBody(entity.body);
		}

		this.entities = this.entities.filter(entity => !this.removedEntities.includes(entity));
		this.removedEntities = [];

		this.entitiesByTile = {};
		for (const entity of this.entities) {
			const tile = entity.tile.toArray().join(',');
			this.entitiesByTile[tile] = this.entitiesByTile[tile] ?? [];
			this.entitiesByTile[tile].push(entity);
		}
	}

}

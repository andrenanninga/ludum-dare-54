import * as THREE from 'three';

import {
	Box,
} from './entities/Box';
import {
	Floor,
} from './entities/Floor';
import {
	Goal,
} from './entities/Goal';
import {
	Player,
} from './entities/Player';
import {
	Wall,
} from './entities/Wall';
import {
	Water,
} from './entities/Water';
import {
	Stage,
} from './Stage';

import type {
	Entity,
} from './Entity';
import type {
	Game,
} from './Game';



export class Loader {

	static textures: Record<string, THREE.Texture> = {};
	static stages: Record<string, Stage> = {};

	game: Game;

	manager: THREE.LoadingManager;

	cubeTextureLoader: THREE.CubeTextureLoader;
	fileLoader: THREE.FileLoader;
	textureLoader: THREE.TextureLoader;

	constructor(game: Game) {
		this.game = game;

		this.manager = new THREE.LoadingManager();

		this.cubeTextureLoader = new THREE.CubeTextureLoader(this.manager);
		this.fileLoader = new THREE.FileLoader(this.manager);
		this.textureLoader = new THREE.TextureLoader(this.manager);
	}

	async load() {
		await new Promise<void>((resolve, reject) => {
			this.manager.onLoad = resolve;
			this.manager.onError = reject;

			this.loadTileset();
			this.loadCubes();
			this.loadLevels();
		});
	}

	private loadTileset() {
		for (let i = 0; i < 8; i++) {
			const texture = this.textureLoader.load(`/assets/tileset/${i}.png`);
			texture.generateMipmaps = false;
			texture.minFilter = THREE.NearestFilter;
			texture.magFilter = THREE.NearestFilter;

			Loader.textures[`tile-${i}`] = texture;
		}
	}

	private loadCubes() {
		const cubes = {
			box: [0, 0, 1, 2, 0, 0],
			wall: [0, 0, 0, 0, 0, 0],
		};

		for (const [name, tiles] of Object.entries(cubes)) {
			const texture = this.cubeTextureLoader.load(tiles.map(i => `/assets/tileset/${i}.png`));
			texture.generateMipmaps = false;
			texture.minFilter = THREE.NearestFilter;
			texture.magFilter = THREE.NearestFilter;

			Loader.textures[`cube-${name}`] = texture;
		}
	}

	private loadLevels() {
		this.fileLoader.load('/assets/playground.tmj', (file) => {
			const data = JSON.parse(file as string);

			data.layers.forEach((layer: any, index: number) => {
				const stage = new Stage(this.game);
				stage.name = layer.name;
				stage.level = index;

				layer.data.forEach((tile: number, index: number) => {
					if (tile === 0) {
						return;
					}

					const position = new THREE.Vector3(
						-Math.floor(index / layer.width),
						0,
						index % layer.width,
					);

					let entity: Entity | null = null;
					let floor: Floor | null = new Floor(stage);
					floor.move(position);

					if (tile === 1) {
						entity = new Floor(stage);
					} else if (tile === 2) {
						entity = new Player(stage);
					} else if (tile === 3) {
						entity = new Box(stage);
					} else if (tile === 4) {
						entity = new Wall(stage);
					} else if (tile === 5) {
						entity = new Goal(stage);
					} else if (tile === 6) {
						entity = new Water(stage);
						floor = null;
					}

					if (entity) {
						entity.move(position);
						stage.add(entity);
					}

					if (floor) {
						stage.add(floor);
					}
				});

				Loader.stages[layer.name] = stage;
				Loader.stages[index] = stage;
			});

			this.game.stage = Loader.stages[0];
		});
	}

}

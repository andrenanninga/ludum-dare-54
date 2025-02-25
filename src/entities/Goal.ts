import * as P2 from 'p2-es';
import * as THREE from 'three';

import {
	Entity,
} from '../Entity';
import {
	Loader,
} from '../Loader';
import {
	Stage,
} from '../Stage';

import {
	Player,
} from './Player';



export class Goal extends Entity {

	mesh: THREE.Mesh;

	isFlippable: boolean = false;
	isDroppable: boolean = true;

	constructor(stage: Stage) {
		super(stage);

		const material = new THREE.MeshNormalMaterial({ wireframe: true });
		const geometry = new THREE.BoxGeometry(1, 1, 1,);

		this.mesh = new THREE.Mesh(
			geometry,
			material
		);

		this.body = new P2.Body();

		this.body.addShape(new P2.Box({
			width: 1,
			height: 1,
			sensor: true,
		}));
	}

	update() {
		super.update();

		const entities = this.stage.getEntitiesOnTile(this.tile);

		const isPlayerOnGoalTile = entities.some(entity => entity instanceof Player);

		if (isPlayerOnGoalTile) {
			const nextStage = Loader.stages[this.stage.level + 1];

			if (nextStage) {
				this.stage.dispose();
				this.stage.game.stage = nextStage;
			}
		}
	}

}

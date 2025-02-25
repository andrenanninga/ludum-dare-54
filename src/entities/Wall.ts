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



export class Wall extends Entity {

	mesh: THREE.Mesh;

	isDroppable: boolean = false;
	isFlippable: boolean = false;

	constructor(stage: Stage) {
		super(stage);

		const material = new THREE.MeshMatcapMaterial({ map: Loader.textures['tile-0'] });
		const geometry = new THREE.BoxGeometry(1, 1, 1);

		this.mesh = new THREE.Mesh(
			geometry,
			material
		);

		this.body = new P2.Body({
			mass: 0,
		});

		this.body.addShape(new P2.Box({
			width: 1,
			height: 1,
		}));
	}

	spawn() {
		super.spawn();

		const geometry = this.mesh.geometry;
		const position = geometry.getAttribute('position');

		for (let i = 0; i < position.array.length; i += 3) {
			position.array[i + 1] += this.stage.noise(
				(position.array[i] + this.position.x) / 2,
				(position.array[i + 2] + this.position.z) / 2
			) / 4;
		}
	}

}

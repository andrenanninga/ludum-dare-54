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



export class Floor extends Entity {

	mesh: THREE.Mesh;

	isFlippable: boolean = false;
	isDroppable: boolean = true;

	constructor(stage: Stage) {
		super(stage);

		const material = new THREE.MeshMatcapMaterial({
			map: Loader.textures['tile-0'],
			color: 0xcccccc,
		});
		const geometry = new THREE.BoxGeometry(1, 0.5, 1);

		this.mesh = new THREE.Mesh(
			geometry,
			material
		);

		this.mesh.geometry.translate(0, -0.75, 0);

		this.body = new P2.Body();
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

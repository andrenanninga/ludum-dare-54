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



export class Box extends Entity {

	mesh: THREE.Mesh;

	isFlippable: boolean = true;
	isDroppable: boolean = false;

	constructor(stage: Stage) {
		super(stage);

		const material = new THREE.MeshMatcapMaterial({ map: Loader.textures['tile-4'] });
		const geometry = new THREE.BoxGeometry(1, 1, 1,);

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

}

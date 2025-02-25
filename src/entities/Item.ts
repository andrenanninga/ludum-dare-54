import * as P2 from 'p2-es';
import * as THREE from 'three';

import {
	Entity,
} from '../Entity';
import {
	Stage,
} from '../Stage';



export class Item extends Entity {

	plane: THREE.Mesh;
	isBillboard: boolean = true;

	constructor(stage: Stage) {
		super(stage);

		this.mesh = new THREE.Group();

		this.plane = new THREE.Mesh(
			new THREE.PlaneGeometry(0.8, 0.8),
			new THREE.MeshMatcapMaterial({ color: THREE.MathUtils.randInt(0x888888, 0xffffff) })
		);

		this.mesh.add(this.plane);

		this.body = new P2.Body({
			mass: 0,
		});

		// this.body.addShape(new P2.Box({
		// 	width: 0.8,
		// 	height: 0.8,
		// }));
	}

	update() {
		super.update();
	}

}

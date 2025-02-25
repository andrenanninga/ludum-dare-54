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



export class Water extends Entity {

	mesh: THREE.Mesh;

	isDroppable: boolean = true;
	isFlippable: boolean = false;

	isFilled = false;

	constructor(stage: Stage) {
		super(stage);

		const material = new THREE.MeshMatcapMaterial({
			map: Loader.textures['tile-5'],
		});
		const geometry = new THREE.BoxGeometry(1, 1, 1);

		this.mesh = new THREE.Mesh(
			geometry,
			material
		);

		geometry.rotateX(-Math.PI / 2);
		geometry.translate(0, -1.25, 0);

		this.body = new P2.Body({
			mass: 0,
		});

		this.body.addShape(new P2.Box({
			width: 1,
			height: 1,
		}));
	}

	update() {
		super.update();

		if (this.isFilled) {
			return;
		}

		const entitiesOnTop = this.stage.getEntitiesOnTile(this.tile).filter(x => x !== this);

		if (entitiesOnTop.length === 0) {
			return;
		}

		entitiesOnTop.forEach(entity => {
			this.stage.remove(entity);
			this.mesh.geometry.translate(0, 0.25, 0);

			this.mesh.material = new THREE.MeshMatcapMaterial({
				map: Loader.textures['tile-4'],
			});

			this.body.shapes.forEach(shape => {
				shape.sensor = true;
			});
		});

		this.isFilled = true;
	}

}

import * as P2 from 'p2-es';
import * as THREE from 'three';
import * as TWEEN from 'tweedle.js';

import {
	Game,
} from './Game';

import type {
	Stage,
} from './Stage';



export const LAYER = {
	ENVIRONMENT: 0x0001,
	PLAYER: 0x0010,
	PROJECTILE: 0x0100,
};



export class Entity {

	stage: Stage;

	mesh: THREE.Object3D;
	body: P2.Body;

	lifetime: number = 0;
	isBillboard: boolean = false;

	isFixed: boolean = false;
	isDroppable: boolean = true;
	isFlippable: boolean = true;

	readonly position: THREE.Vector3;
	private _angle: number;

	constructor(stage: Stage) {
		this.stage = stage;

		this.mesh = new THREE.Object3D();
		this.body = new P2.Body({ mass: 0 });

		this.position = new THREE.Vector3();
		this._angle = 0;
	}

	get angle() {
		return this._angle;
	}

	get tile() {
		return new THREE.Vector3(
			Math.round(this.position.x),
			0,
			Math.round(this.position.z)
		);
	}

	move(vector: THREE.Vector3) {
		this.position.copy(vector);

		this.body.position[0] = vector.x;
		this.body.position[1] = vector.z;

		P2.vec2.copy(this.body.previousPosition, this.body.position);
		P2.vec2.copy(this.body.interpolatedPosition, this.body.position);

		this.body.aabbNeedsUpdate = true;
	}

	rotate(angle: number) {
		this._angle = angle;

		this.body.angle = angle;
		this.body.previousAngle = angle;
		this.body.interpolatedAngle = angle;

		this.body.aabbNeedsUpdate = true;
	}

	spawn() {
		// noop
	}

	update() {
		this.lifetime += Game.step;

		this.position.x = this.body.position[0];
		this.position.z = this.body.position[1];

		this.mesh.position.copy(this.position);
		this.mesh.rotation.y = this.angle;

		if (this.isBillboard) {
			this.mesh.lookAt(
				this.stage.game.camera.position
					.clone()
					.multiplyScalar(100_000)
			);
		}
	}

	flip(target: THREE.Vector3) {
		const direction = this.tile.clone().sub(target).normalize();
		const pivot = this.tile.clone();
		pivot.lerp(target, 0.5);

		this.move(target);

		const group = new THREE.Group();
		group.position.copy(pivot);

		const clone = this.mesh.clone();
		clone.position.sub(pivot);
		group.add(clone);

		this.stage.scene.add(group);

		const rotationTarget = new THREE.Euler(Math.PI * -direction.z, 0, Math.PI * direction.x);

		this.mesh.visible = false;

		new TWEEN.Tween(group.rotation)
			.easing(TWEEN.Easing.Bounce.Out)
			.to(rotationTarget, 350)
			.start()
			.onUpdate((x) => {
				group.rotation.copy(x);

				if (this.isBillboard) {
					clone.lookAt(
						this.stage.game.camera.position
							.clone()
							.multiplyScalar(100_000)
					);
				}
			})
			.onComplete(() => {
				this.mesh.visible = true;
				this.mesh.rotateOnAxis(new THREE.Vector3(direction.y, 0, direction.x), Math.PI);

				this.stage.scene.remove(group);
			});
	}

}

import * as P2 from 'p2-es';
import * as THREE from 'three';

import {
	Entity,
} from '../Entity';
import {
	Game,
} from '../Game';
import {
	Stage,
} from '../Stage';



export class Player extends Entity {

	dropMarker: THREE.Mesh;
	targetMarker: THREE.Mesh;

	focusedEntity: Entity | null = null;
	entityDropPosition: THREE.Vector3 | null = null;

	direction: THREE.Vector2;
	range: number = 2;

	flipCooldown: number = 0;

	isDroppable: boolean = false;
	isFlippable: boolean = false;

	constructor(stage: Stage) {
		super(stage);

		this.direction = new THREE.Vector2(1, 0);

		this.mesh = new THREE.Mesh(
			new THREE.SphereGeometry(0.4, 4, 4),
			new THREE.MeshNormalMaterial()
		);

		this.body = new P2.Body({
			mass: 1,
		});

		this.body.addShape(
			new P2.Circle({
				radius: 0.4,
			})
		);

		this.targetMarker = new THREE.Mesh(
			new THREE.BoxGeometry(1.05, 1.05, 1.05),
			new THREE.MeshBasicMaterial({
				color: 0xff0000,
				wireframe: true,
			})
		);

		this.targetMarker.visible = false;
		this.stage.scene.add(this.targetMarker);

		this.dropMarker = new THREE.Mesh(
			new THREE.BoxGeometry(0.8, 0.8, 0.8),
			new THREE.MeshBasicMaterial({
				color: 0x00ff00,
				wireframe: true,
			})
		);
		this.dropMarker.visible = false;

		this.stage.scene.add(this.dropMarker);
	}

	spawn() {
		super.spawn();

		this.stage.game.camera.position.set(
			this.position.x - 5,
			8,
			this.position.z - 1
		);

		this.stage.game.camera.lookAt(this.position);
	}

	update() {
		super.update();

		this.updateMovement();
		this.updateCamera();
		this.updateTarget();
		this.updateFlip();



		// if (keySpace.down && this.flipCooldown < 0) {
		// 	this.flipCooldown = 0.5;

		// 	for (let i = -this.range; i <= this.range; i++) {
		// 		if (i === 0) {
		// 			continue;
		// 		}

		// 		const origin = this.tile.clone();
		// 		const target = this.tile.clone();

		// 		origin.x += this.direction.x * i;
		// 		origin.z += this.direction.y * i;

		// 		target.x -= this.direction.x;
		// 		target.z -= this.direction.y;

		// 		const originEntities = this.stage.getEntitiesOnTile(origin).filter(x => x !== this);
		// 		const targetEntities = this.stage.getEntitiesOnTile(target).filter(x => x !== this);

		// 		const flippableEntities = originEntities.filter(entity => entity.isFlippable);
		// 		const isDroppable = targetEntities.every(entity => entity.isDroppable);

		// 		if (isDroppable && flippableEntities.length > 0) {
		// 			flippableEntities.forEach(entity => {
		// 				const pivot = entity.tile.clone();

		// 				pivot.lerp(target, 0.5);

		// 				entity.flip(target);
		// 			});

		// 			break;
		// 		}
		// 	}
		// }
	}

	private updateMovement() {
		const keyboard = this.stage.game.keyboard;

		const keyW = keyboard.get('KeyW');
		const keyA = keyboard.get('KeyA');
		const keyS = keyboard.get('KeyS');
		const keyD = keyboard.get('KeyD');

		const inputVelocity = new THREE.Vector2();

		const latestKey = [keyW, keyA, keyS, keyD]
			.filter(key => key.down)
			.sort((a, b) => a.duration - b.duration)[0];

		if (keyW === latestKey || keyS === latestKey) {
			if (keyW.down) {
				inputVelocity.x += 1;
			}
			if (keyS.down) {
				inputVelocity.x -= 1;
			}
		}

		if (keyD === latestKey || keyA === latestKey) {
			if (keyD.down) {
				inputVelocity.y += 1;
			}
			if (keyA.down) {
				inputVelocity.y -= 1;
			}
		}

		inputVelocity.normalize().multiplyScalar(4);

		const velocity = new THREE.Vector2().fromArray(this.body.velocity);
		velocity.lerp(inputVelocity, 0.25);

		this.body.velocity[0] = velocity.x;
		this.body.velocity[1] = velocity.y;

		if (inputVelocity.length() > 0) {
			this.direction = inputVelocity.normalize();
		}
	}

	private updateCamera() {
		this.stage.game.camera.position.lerp(
			new THREE.Vector3(
				this.position.x - 5,
				8,
				this.position.z - 1
			),
			0.5
		);

		this.stage.game.camera.lookAt(this.position);
	}

	private updateTarget() {
		if (this.focusedEntity !== null) {
			const distance = this.focusedEntity.tile.distanceTo(this.tile);

			const isTooFar = distance > this.range;
			const isNoLongerFlippable = this.focusedEntity.isFlippable === false;
			const isBlocked = (
				this.entityDropPosition === null
				|| this.stage.getEntitiesOnTile(this.entityDropPosition).some(entity => entity.isDroppable === false)
			);

			if (isTooFar || isNoLongerFlippable || isBlocked) {
				this.focusedEntity = null;
				this.entityDropPosition = null;
				this.dropMarker.visible = false;
				this.targetMarker.visible = false;
			}

			if (!this.entityDropPosition) {
				this.focusedEntity = null;
			}
		}

		if (this.focusedEntity === null) {
			const nearestFlippableEntities = this.stage.entities
				.slice(0)
				.filter(entity => entity.isFlippable)
				.sort((a, b) => a.tile.distanceTo(this.tile) - b.tile.distanceTo(this.tile))
				.slice(0, 1)
				.filter(entity => entity.tile.distanceTo(this.tile) <= this.range);

			for (const entity of nearestFlippableEntities) {
				const dropPosition = new THREE.Vector3();

				const direction = this.tile.clone()
					.sub(entity.tile)
					.normalize();

				if (Math.abs(direction.x) > Math.abs(direction.z)) {
					dropPosition.set(this.tile.x + Math.sign(direction.x), 0, entity.tile.z);
				} else {
					dropPosition.set(entity.tile.x, 0, this.tile.z + Math.sign(direction.z),);
				}

				const dropPositionEntity = this.stage.getEntitiesOnTile(dropPosition)[0] ?? null;

				if (dropPositionEntity === null || dropPositionEntity.isDroppable) {
					this.focusedEntity = entity;
					this.entityDropPosition = dropPosition;
					break;
				}
			}
		}

		if (this.focusedEntity === null || this.entityDropPosition === null) {
			this.targetMarker.visible = false;
			this.dropMarker.visible = false;
		} else {
			this.targetMarker.visible = true;
			this.targetMarker.position.copy(this.focusedEntity.tile);

			this.dropMarker.position.copy(this.entityDropPosition);
			this.dropMarker.visible = true;
		}
	}

	private updateFlip() {
		const keySpace = this.stage.game.keyboard.get('Space');

		this.flipCooldown -= Game.step;

		if (!keySpace.down) {
			return;
		}

		if (this.flipCooldown > 0) {
			return;
		}

		if (this.focusedEntity === null) {
			return;
		}

		if (this.entityDropPosition === null) {
			return;
		}

		this.flipCooldown = 0.5;
		this.focusedEntity.flip(this.entityDropPosition);
	}

}

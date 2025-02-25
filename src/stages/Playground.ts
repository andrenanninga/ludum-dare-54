import * as THREE from 'three';

import {
	Item,
} from '../entities/Item';
import {
	Player,
} from '../entities/Player';
import {
	Wall,
} from '../entities/Wall';
import {
	Game,
} from '../Game';
import {
	Stage,
} from '../Stage';



export class Playground extends Stage {

	constructor(game: Game) {
		super(game);

		const size = 10;

		for (let x = -size; x <= size; x++) {
			for (let y = -size; y <= size; y++) {
				if (Math.abs(x) === size || Math.abs(y) === size) {
					const wall = new Wall(this);
					wall.isFixed = true;
					wall.move(new THREE.Vector3(x, 0, y));
					this.add(wall);
				} else if (x === 0 && y === 0) {
					continue;
				} else if (Math.random() > 0.9) {
					const wall = new Wall(this);
					wall.move(new THREE.Vector3(x, 0, y));
					this.add(wall);
				} else if (Math.random() > 0.85) {
					const item = new Item(this);
					item.move(new THREE.Vector3(x, 0, y));
					this.add(item);
				}
			}
		}

		const player = new Player(this);
		this.add(player);
	}

}

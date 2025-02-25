import * as THREE from 'three';

import {
	Game,
} from './src/Game';



const canvas = document.getElementById('game');

if (canvas instanceof HTMLCanvasElement) {
	const game = new Game(canvas);

	// @ts-expect-error global
	window.game = game;
	window.THREE = THREE;
} else {
	throw Error('Failed to find canvas element');
}

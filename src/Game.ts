import {
	PerspectiveCamera,
	Vector3,
	WebGLRenderer,
} from 'three';
import * as TWEEN from 'tweedle.js';

import {
	Keyboard,
} from './Keyboard';
import {
	Loader,
} from './Loader';
import {
	Signal,
} from './Signal';
import {
	Stage,
} from './Stage';



type Params = {
	fps?: number
};


export class Game {

	static step: number;
	static frame: number;

	static readonly blur = new Signal<Game>();
	static readonly focus = new Signal<Game>();
	static readonly render = new Signal<Game>();
	static readonly update = new Signal<Game, number>();

	camera: PerspectiveCamera;
	renderer: WebGLRenderer;

	stage: Stage;
	loader: Loader;
	keyboard: Keyboard;

	fps: number;
	accumulator: number;
	delta: number;

	isStopped: boolean = false;
	isFocused: boolean = true;

	now: number = 0;
	last: number = 0;

	animationFrameRequest: number = 0;



	constructor(canvas: HTMLCanvasElement, params: Params = {}) {
		this.fps = params.fps ?? 60;
		this.accumulator = 0;
		this.delta = 1000 / this.fps;
		Game.step = 1 / this.fps;
		Game.frame = 0;

		this.keyboard = new Keyboard();
		this.loader = new Loader(this);

		this.renderer = new WebGLRenderer({
			canvas,
		});

		this.camera = new PerspectiveCamera(45);
		this.stage = new Stage(this);

		this.camera.position.set(-20, 20, 0);
		this.camera.lookAt(new Vector3(0, 0, 0));

		window.addEventListener('focus', () => {
			Game.focus.trigger(this);
			this.isFocused = true;
		});

		window.addEventListener('blur', () => {
			Game.blur.trigger(this);
			this.isFocused = false;
		});

		window.addEventListener('resize', () => {
			this.resize();
		});

		this.resize();
		this.loader.load().then(() => this.start());
	}

	resize() {
		const domElement = this.renderer.domElement;

		const width = domElement.clientWidth;
		const height = domElement.clientHeight;

		this.renderer.setSize(width, height);
		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
	}

	start() {
		this.last = performance.now();
		this.isStopped = false;

		requestAnimationFrame(() => this.tick());
	}

	stop() {
		this.isStopped = true;

		cancelAnimationFrame(this.animationFrameRequest);
	}

	tick() {
		requestAnimationFrame(() => this.tick());

		if (!this.isFocused) {
			return;
		}

		this.now = performance.now();
		const delta = this.now - this.last;
		this.last = this.now;

		if (delta > 1000) {
			return;
		}

		this.accumulator += delta;

		while (this.accumulator >= this.delta) {
			this.keyboard.beforeUpdate();
			this.stage.update();
			TWEEN.Group.shared.update();
			this.keyboard.afterUpdate();

			Game.update.trigger(this, Game.step);

			this.accumulator -= this.delta;
		}

		Game.render.trigger(this);

		this.renderer.render(this.stage.scene, this.camera);
		this.keyboard.cleanup();

		Game.frame += 1;
	}

}

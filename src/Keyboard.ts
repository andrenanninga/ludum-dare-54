import {
	Game,
} from './Game';
import {
	Signal,
} from './Signal';



type KeyState = {
	down: boolean,
	duration: number,
	key: string,
	pressed: boolean,
	released: boolean,
};

export class Keyboard {

	static readonly press = new Signal<Keyboard, KeyState>();
	static readonly release = new Signal<Keyboard, KeyState>();

	private keys: Record<string, KeyState> = {};

	private readonly releasedKeys: Set<string> = new Set();

	constructor() {
		document.addEventListener('keydown', (event) => this.onKeyDown(event));
		document.addEventListener('keyup', (event) => this.onKeyUp(event));

		Game.blur.on(() => this.onBlur());
	}

	get(key: string): KeyState {
		if (!this.keys[key]) {
			this.keys[key] = {
				down: false,
				duration: 0,
				pressed: false,
				released: false,
				key,
			};
		}

		return this.keys[key];
	}

	release(key: string) {
		this.releasedKeys.add(key);
	}

	onBlur() {
		for (const key of Object.keys(this.keys)) {
			this.keys[key].down = false;
			this.keys[key].duration = 0;
			this.keys[key].pressed = false;
			this.keys[key].released = false;
		}
	}

	onKeyDown(event: KeyboardEvent) {
		this.keys[event.code] = this.keys[event.code] ?? {
			key: event.code,
		};

		if (this.keys[event.code].down) {
			return;
		}

		this.keys[event.code].down = true;
		this.keys[event.code].duration = 0;
		this.keys[event.code].pressed = true;
		this.keys[event.code].released = false;

		Keyboard.press.trigger(this, this.keys[event.code]);
	}

	onKeyUp(event: KeyboardEvent) {
		this.releasedKeys.add(event.code);
	}

	beforeUpdate() {
		for (const key of Object.keys(this.keys)) {
			this.keys[key].duration += Game.step;
		}
	}

	afterUpdate() {
		for (const key of Object.keys(this.keys)) {
			this.keys[key].pressed = false;
			this.keys[key].released = false;
		}
	}

	cleanup() {
		for (const releasedKey of this.releasedKeys.values()) {
			this.keys[releasedKey] = this.keys[releasedKey] ?? {
				key: releasedKey,
			};

			if (this.keys[releasedKey].duration < Game.step) {
				continue;
			}

			this.keys[releasedKey].down = false;
			this.keys[releasedKey].duration = 0;
			this.keys[releasedKey].pressed = false;
			this.keys[releasedKey].released = true;

			Keyboard.release.trigger(this, this.keys[releasedKey]);

			this.releasedKeys.delete(releasedKey);
		}
	}

}

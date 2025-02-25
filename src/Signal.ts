export class Signal<Source, Data = any> {

	private handlers: (
		Array<(...args: undefined extends Data ? [source: Source] : [source: Source, data: Data]) => void>
	) = [];

	public on(handler: (...args: undefined extends Data ? [source: Source] : [source: Source, data: Data]) => void) {
		this.handlers.push(handler);

		return () => {
			this.handlers = this.handlers.filter(h => h !== handler);
		};
	}

	public trigger(...args: undefined extends Data ? [source: Source] : [source: Source, data: Data]): void {
		this.handlers.forEach(handler => handler(...args));
	}

}

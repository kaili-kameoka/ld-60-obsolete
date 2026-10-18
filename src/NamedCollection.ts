
export default class NamedCollection<TName, T extends { readonly name: TName}> {
	private readonly  entries: Map<TName, T>;

	constructor() {
		this.entries = new Map<TName, T>();
	}

	public addEntry(entry: T) {
		this.entries.set(entry.name, entry);
	}

	public getEntry(name: TName) {
		const entry = this.entries.get(name);
		if (!entry) throw new Error(`Cannot get entry ${name}`);
		return entry;
	}

	public getAll() {
		return [...this.entries.values()];
	}
}
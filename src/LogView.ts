export default class LogView {
	private list: HTMLElement;

	constructor() {
		let list = document.getElementById('logView');
		if (!list) {
			list = document.createElement('ul');
		}
		this.list = list;
	}

	public addLogEntry(entry: string) {
		const liElement = document.createElement('li');
		liElement.innerHTML = entry;
		this.list.append(liElement);
		this.list.scrollTop = this.list.scrollHeight;
	}
}
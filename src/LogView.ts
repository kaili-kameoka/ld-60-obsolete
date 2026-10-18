export default class LogView {
	public element: HTMLElement;
	private list: HTMLDListElement;

	constructor() {
		this.element = document.createElement('section');
		const titleElement = document.createElement('h2');
		titleElement.innerHTML = "Activity Log";
		this.list = document.createElement('ul');
		this.list.style.height = '25vh';
		this.list.style.overflowY = 'scroll';
		this.element.append(titleElement, this.list);
	}

	public addLogEntry(entry: string) {
		const liElement = document.createElement('li');
		liElement.innerHTML = entry;
		this.list.append(liElement);
		this.list.scrollTop = this.list.scrollHeight;
	}
}
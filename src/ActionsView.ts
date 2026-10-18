import type ActionButton from "./ActionButton.ts";

export default class ActionsView {
	public readonly element: HTMLDivElement;

	constructor(viewTitle: string) {
		this.element = document.createElement('div')
		const titleElement = document.createElement('h2');
		titleElement.innerHTML = viewTitle;
		this.element.append(titleElement);
	}

	public addButton(label: string, onClick: () => void): ActionButton {
		const button = document.createElement('button');
		button.type = 'button';
		button.innerHTML = label;
		button.onclick = onClick;
		this.element.append(button);

		return {
			setEnabled: (enabled: boolean) => button.setAttribute('aria-disabled', String(!enabled)),
		}
	}
}
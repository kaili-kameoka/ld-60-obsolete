import type ActionButton from "./ActionButton.ts";

export default class ActionsView {
	private element: HTMLElement;

	constructor(elementId: string) {
		let element = document.getElementById(elementId);
		if (!element) {
		element = document.createElement('div')
		}
		this.element = element;
	}

	public addButton(label: string, onClick: () => void): ActionButton {
		const button = document.createElement('button');
		button.type = 'button';
		button.innerHTML = label;
		button.onclick = onClick;
		this.element.append(button);

		return {
			setEnabled: (enabled: boolean) => button.setAttribute('aria-disabled', String(!enabled)),
			setLabel: (label: string) => button.innerHTML = label,
			 setVisible: (visible: boolean) => button.hidden = !visible,
		}
	}
}
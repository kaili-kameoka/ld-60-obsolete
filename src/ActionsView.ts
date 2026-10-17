import type ActionButton from "./ActionButton.ts";

export default class ActionsView {
	public readonly element: HTMLDivElement;

	constructor() {
		this.element = document.createElement('div')
	}

	public addButton(label: string, onClick: () => void): ActionButton {
		const button = document.createElement('button');
		button.type = 'button';
		button.innerHTML = label;
		button.onclick = () => {
			if(button.getAttribute('aria-disabled') === 'false') {
				onClick();
			}
		};

		this.element.append(button);

		return {
			setEnabled: (enabled: boolean) => button.setAttribute('aria-disabled', String(!enabled)),
		}
	}
}
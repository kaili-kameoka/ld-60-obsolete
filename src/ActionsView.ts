export default class ActionsView {
	public readonly element: HTMLDivElement;

	private readonly gatherWoodButton: HTMLButtonElement;

	constructor() {
		this.element = document.createElement('div')
		this.gatherWoodButton = document.createElement('button')
		this.gatherWoodButton.type = 'button'
		this.gatherWoodButton.innerHTML = 'Gather Wood';
		this.element.append(this.gatherWoodButton);
	}

	public setGatherWoodEnabled(enabled: boolean) {
		this.gatherWoodButton.setAttribute('aria-disabled', String(!enabled))
	}

	public onGatherWood(handler: () => void) {
		this.gatherWoodButton.onclick = () => {
			if (this.gatherWoodButton.getAttribute('aria-disabled') === 'false') {
				handler();
			}
		}
	}
}
import type GameStateDTO from "./GameStateDTO.ts";

export default class GameStateView {
	public element: HTMLDivElement;

	private table: HTMLTableElement;
	private currentTurnCell: HTMLTableCellElement;
	private populationCell: HTMLTableCellElement;
	private energyCell: HTMLTableCellElement;
	private woodCell: HTMLTableCellElement;

	constructor () {
		this.element = document.createElement('div');
		const titleElement = document.createElement('h2');
		titleElement.innerHTML = 'Stats';
		this.table = document.createElement('table');
		this.currentTurnCell = this.addRow('Turn #: ');
		this.populationCell = this.addRow('Population #: ');
		this.energyCell = this.addRow('Energy');
		this.woodCell = this.addRow('Wood');
		this.element.append(titleElement, this.table);
	}

	public render(gameStateDTO: GameStateDTO) {
		this.currentTurnCell.innerHTML = `${gameStateDTO.currentTurn}`;
		this.populationCell.innerHTML = `${gameStateDTO.population}`
		const {quantity: energy, startTurnQuantity: startTurnEnergy } = gameStateDTO.energy;
		this.energyCell.innerHTML = `${energy} / ${startTurnEnergy}`;
		this.woodCell.innerHTML = `${gameStateDTO.resources.find(r => r.name === "Wood")?.quantity}`;
	}

	private addRow(label: string) {
		const tr = this.table.insertRow();
		const th = document.createElement('th')
		th.innerText = label;
		const td = document.createElement('td');
		tr.append(th, td);
		return td;
	}
}

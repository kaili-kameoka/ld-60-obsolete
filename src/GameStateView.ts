import type GameStateDTO from "./GameStateDTO.ts";

export default class GameStateView {
	public table: HTMLTableElement;
	private currentTurnCell: HTMLTableCellElement;
	private energyCell: HTMLTableCellElement;
	private woodCell: HTMLTableCellElement;

	constructor () {
		this.table = document.createElement('table');
		this.currentTurnCell = this.addRow('Turn #: ');
		this.energyCell = this.addRow('Energy');
		this.woodCell = this.addRow('Wood');
	}

	public render(gameStateDTO: GameStateDTO) {
		this.currentTurnCell.innerHTML = `${gameStateDTO.currentTurn}`;
		const {quantity: energy, startTurnQuantity: startTurnEnergy } = gameStateDTO.energy;
		this.energyCell.innerHTML = `${energy} / ${startTurnEnergy}`;
		const woodQuantity = gameStateDTO.resources.find(r => r.name === "Wood");;
		console.log(woodQuantity);
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

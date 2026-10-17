import type GameStateDTO from "./GameStateDTO.ts";

export default class GameStateView {
	public table: HTMLTableElement;
	private currentTurnCell: HTMLTableCellElement;
	private energyCell: HTMLTableCellElement;
	private woodCell: HTMLTableCellElement;

	constructor () {
		this.table = document.createElement('table');;
		this.currentTurnCell = this.addRow('Turn #: ');
		this.energyCell = this.addRow('Energy');
		this.woodCell = this.addRow('Wood');
	}

	public render(gameStateDTO: GameStateDTO) {
		this.currentTurnCell.innerHTML = `${gameStateDTO.currentTurn}`;
		this.energyCell.innerHTML = `${gameStateDTO.energy} / ${gameStateDTO.turnStartEnergy}`;
		this.woodCell.innerHTML = `${gameStateDTO.wood}`;
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

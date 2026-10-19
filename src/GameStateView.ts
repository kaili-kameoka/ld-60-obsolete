import type GameStateDTO from "./GameStateDTO.ts";
import type {ResourceName} from "./ResourceNames.ts";

export default class GameStateView {
	private readonly table: HTMLElement;
	private currentTurnCell: HTMLTableCellElement;
	private populationCell: HTMLTableCellElement;
	private energyCell: HTMLTableCellElement;
	private resourceCells: Map<ResourceName, HTMLTableCellElement>;

	constructor() {
		let table = document.getElementById('GameStateView');
		if (!table) {
			table = document.createElement('table');
		}
		this.table = table;
		this.currentTurnCell = this.addRow('Turn #: ');
		this.populationCell = this.addRow('Population #: ');
		this.energyCell = this.addRow('Energy');
		this.resourceCells = new Map<ResourceName, HTMLTableCellElement>();
	}

	public render(gameStateDTO: GameStateDTO) {
		this.currentTurnCell.innerHTML = `${gameStateDTO.currentTurn} / ${gameStateDTO.turnLimit}`;
		this.populationCell.innerHTML = `${gameStateDTO.population}`
		const {quantity: energy, startTurnQuantity: startTurnEnergy} = gameStateDTO.energy;
		this.energyCell.innerHTML = `${energy} / ${startTurnEnergy}`;
		for (const {name, quantity} of gameStateDTO.resources) {
			let cell = this.resourceCells.get(name);
			if (!cell) {
				cell = this.addRow(name);
				this.resourceCells.set(name, cell);
			}
			cell.innerHTML = `${quantity}`;
		}
	}

	private addRow(label: string) {
		const tr = document.createElement('tr');
		const th = document.createElement('th')
		th.innerText = label;
		const td = document.createElement('td');
		tr.append(th, td);
		this.table.append(tr);
		return td;
	}
}

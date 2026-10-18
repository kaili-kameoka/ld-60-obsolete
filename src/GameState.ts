import type Resource from "./Resource.ts";
import EnergyResource from "./EnergyResource.ts";
import type {ResourceName} from "./ResourceNames.ts";
import NamedCollection from "./NamedCollection.ts";
import type {ItemNames} from "./ItemNames.ts";
import type Item from "./Item.ts";
import type {GameStatus} from "./GameStatus.ts";

export default  class GameState {
	public readonly energy: EnergyResource;
	public readonly resources: NamedCollection<ResourceName, Resource>;
	public readonly items: NamedCollection<ItemNames, Item>;
	public readonly turnLimit: number;

	private _currentTurn: number;

	constructor() {
		this._currentTurn = 1;
		this.turnLimit = 20;
		this.energy = new EnergyResource();
		this.resources = new NamedCollection<ResourceName, Resource>();
		this.items = new NamedCollection<ItemNames, Item>();
	}

	private incrementTurn() {
		this._currentTurn++;
	}

	public get currentTurn() {
		return this._currentTurn;
	}

	public get status(): GameStatus {
		if (this.items.getEntry('Mainframe').getQuantity() > 0) return 'Win';
		if (this._currentTurn > this.turnLimit) return 'Lose';
		return 'Playing';
	}

	public get population() {
		return this.items.getEntry('Hut').getQuantity() + 1;
	}

	public nextTurn() {
		this.incrementTurn();
		this.energy.setStartTurnQuantityBy(this.population);
		this.energy.resetEnergy();
	}
}
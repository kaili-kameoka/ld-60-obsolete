import type Resource from "./Resource.ts";
import EnergyResource from "./EnergyResource.ts";
import type {ResourceName} from "./ResourceNames.ts";
import NamedCollection from "./NamedCollection.ts";
import type {ItemNames} from "./ItemNames.ts";
import type Item from "./Item.ts";

export default  class GameState {
	public readonly energy: EnergyResource;
	public readonly resources: NamedCollection<ResourceName, Resource>;
	public readonly items: NamedCollection<ItemNames, Item>;

	private _currentTurn: number;


	constructor() {
		this._currentTurn = 1;
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

	public get population() {
		return this.items.getEntry('Hut').getQuantity() * 2;
	}

	public nextTurn() {
		this.incrementTurn();
		this.energy.increaseStartTurnQuantityBy(this.population);
		this.energy.resetEnergy();
	}
}
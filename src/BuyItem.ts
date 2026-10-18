import type Action from "./Action.ts";
import GameState from "./GameState.ts";
import type {ItemNames} from "./ItemNames.ts";
import type Item from "./Item.ts";

export default class BuyItem implements Action {
	private readonly gameState: GameState;
	private readonly name: ItemNames;
	private item: Item;

	constructor(gameState: GameState, name: ItemNames) {
		this.gameState = gameState;
		this.name = name;
		this.item = this.gameState.items.getEntry(this.name);
	}

	public canExecute() {
		if (!this.item.canIncrement()) return false;
		return this.item.cost.every(({name, cost}) => {
			return this.gameState.resources.getEntry(name).hasQuantity(cost);
		})
	}

	public execute() {
		if (this.canExecute()) {
			for (const {name, cost} of this.item.cost) {
				this.gameState.resources.getEntry(name).decreaseQuantityBy(cost);
			}
			this.item.incrementQuantity();
		}
	}
}
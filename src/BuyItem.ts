import type Action from "./Action.ts";
import GameState from "./GameState.ts";
import type {ItemNames} from "./ItemNames.ts";
import type Item from "./Item.ts";

export default class BuyItem implements Action {
	private readonly gameState: GameState;
	private readonly name: ItemNames;
	private readonly item: Item;

	constructor(gameState: GameState, name: ItemNames) {
		this.gameState = gameState;
		this.name = name;
		this.item = this.gameState.items.getEntry(this.name);
	}

	public getDetails() {
		return this.item.cost.map(({name, cost}) => `<span class="button__details"><span class="button__th">${name}</span><span class="button__td">${cost}</span></span>`).join('');
	}

	public isAvailable() {
		return this.hasRequiredItem() && this.item.canIncrement();
	}

	private hasRequiredItem() {
		const {requiredItem} = this.item;
		return !requiredItem || this.gameState.items.getEntry(requiredItem).getQuantity() > 0;
	}

	public canExecute() {
		if (!this.hasRequiredItem() || !this.item.canIncrement()) return false;
		return this.item.cost.every(({name, cost}) => {
			return this.gameState.resources.getEntry(name).hasQuantity(cost);
		})
	}

	public execute() {
		if (!this.hasRequiredItem()) return `You need ${this.item.requiredItem}`;
		if (!this.item.canIncrement()) return `You can't have more than ${this.item.quantityLimit} ${this.item.name}(s).`;
		if (this.canExecute()) {
			for (const {name, cost} of this.item.cost) {
				this.gameState.resources.getEntry(name).decreaseQuantityBy(cost);
			}
			this.item.incrementQuantity();
			return `Bought ${this.item.name}`
		}
		const needsListString = this.item.cost.map(({name, cost}) => `${cost} ${name}`).join(', ');
		return `Could not buy ${this.item.name} needs ${needsListString}`
	}
}
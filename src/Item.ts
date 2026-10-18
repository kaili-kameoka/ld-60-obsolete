import type {ItemNames} from "./ItemNames.ts";
import type {ItemCost} from "./ItemCost.ts";

export default class Item {
	public readonly name:  ItemNames;
	public readonly quantityLimit: number;
	public readonly cost: ItemCost;

	private quantity: number;

	constructor(name: ItemNames, quantityLimit: number, cost: ItemCost) {
		this.name = name;
		this.quantity = 0;
		this.quantityLimit = quantityLimit;
		this.cost = cost;
	}

	public incrementQuantity() {
		if (!this.canIncrement()) throw new Error("Quantity is out of range");
		this.quantity++;
	}

	public canIncrement(): boolean {
		return this.quantity < this.quantityLimit
	}
	public getQuantity() {
		return this.quantity;
	}
}
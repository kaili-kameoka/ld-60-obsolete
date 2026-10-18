import type {ResourceName} from "./ResourceNames.ts";

export default class Resource {
	public readonly name: ResourceName;

	protected quantity: number;

	constructor(name: ResourceName) {
		this.name = name;
		this.quantity = 0;
	}

	public increaseQuantityBy(amount: number) {
		this.quantity += amount;
	}

	public decreaseQuantityBy(amount: number) {
		if (amount < 0) throw new Error("Amount must be a positive number");
		if (!this.hasQuantity(amount)) throw new Error("Amount must be less than the quantity");
		this.quantity -= amount;
	}

	public getQuantity() {
		return this.quantity;
	}

	public hasQuantity(amount: number) {
		return amount <= this.quantity;
	}
}
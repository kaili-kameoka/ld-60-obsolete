import Resource from "./Resource.ts";

export default class EnergyResource extends Resource {
	private startTurnQuantity: number;

	constructor() {
		super("Energy");
		this.startTurnQuantity = 1;
		this.quantity = this.startTurnQuantity;
	}

	public increaseStartTurnQuantityBy(amount: number) {
		this.startTurnQuantity += amount;
	}

	public resetEnergy() {
		this.quantity = this.startTurnQuantity;
	}

	public getStartTurnQuantity() {
		return this.startTurnQuantity;
	}
}
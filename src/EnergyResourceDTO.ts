import type EnergyResource from "./EnergyResource.ts";

export default class EnergyResourceDTO {
	public readonly name: string;
	public readonly quantity: number;
	public readonly startTurnQuantity: number;

	private constructor(name: string, quantity: number, startTurnQuantity: number) {
		this.name = name;
		this.quantity = quantity;
		this.startTurnQuantity = startTurnQuantity;
	}

	public static from(energyResource: EnergyResource) {
		return new EnergyResourceDTO(
			 energyResource.name,
			 energyResource.getQuantity(),
			 energyResource.getStartTurnQuantity(),
		)
	}

}
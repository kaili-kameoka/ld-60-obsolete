import type GameState from "./GameState.ts";

export default class GatherWood {
	private readonly gameState: GameState;

	constructor(gameState: GameState) {
		this.gameState = gameState;
	}

	public canExecute() {
		return this.gameState.hasEnergy(1)
	}

	public execute() {
		if(this.canExecute()) {
			this.gameState.decreaseEnergyBy(1);
			this.gameState.increaseWoodBy(5);
		}
	}
}
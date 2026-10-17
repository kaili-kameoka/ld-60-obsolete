import type GameState from "./GameState.ts";
import type Action from "./Action.ts";

export default class GatherWood implements Action{
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
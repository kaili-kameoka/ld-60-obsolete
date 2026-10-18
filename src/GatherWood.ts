import type GameState from "./GameState.ts";
import type Action from "./Action.ts";

export default class GatherWood implements Action{
	private readonly gameState: GameState;

	constructor(gameState: GameState) {
		this.gameState = gameState;
	}

	public canExecute() {
		return this.gameState.getEnergy().hasQuantity(1)
	}

	public execute() {
		console.log(this.canExecute())
		if(this.canExecute()) {
			this.gameState.getEnergy().decreaseQuantityBy(1);
			this.gameState.getResourceByName("Wood")?.increaseQuantityBy(5);
		}
	}
}
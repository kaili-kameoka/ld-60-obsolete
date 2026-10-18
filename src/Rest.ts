import type GameState from "./GameState.ts";
import type Action from "./Action.ts";

export default class Rest implements  Action {
	private gameState: GameState;

	constructor(gameState: GameState) {
		this.gameState = gameState;
	}

	public canExecute() {
		return true;
	}

	public execute() {
		this.gameState.nextTurn();
	}
}
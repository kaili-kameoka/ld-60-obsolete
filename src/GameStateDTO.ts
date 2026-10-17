import type GameState from "./GameState.ts";

export default class GameStateDTO {
	public readonly currentTurn: number;
	public readonly turnStartEnergy: number
	public readonly energy: number;
	public readonly wood: number;

	private constructor(currentTurn: number, turnStartEnergy: number, energy: number, wood: number) {
		this.currentTurn = currentTurn;
		this.turnStartEnergy = turnStartEnergy;
		this.energy = energy;
		this.wood = wood;
	}

	public static from(state: GameState) {
		return new GameStateDTO(state.getCurrentTurn(), state.getStartTurnEnergy(), state.getEnergy(), state.getWood());
	}
}
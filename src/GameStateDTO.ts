import type GameState from "./GameState.ts";
import ResourceDTO from "./ResourceDTO.ts";
import EnergyResourceDTO from "./EnergyResourceDTO.ts";

export default class GameStateDTO {
	public readonly currentTurn: number;
	public readonly turnLimit: number;
	public readonly population: number;
	public readonly energy: EnergyResourceDTO
	public readonly resources: ResourceDTO[];

	private constructor(currentTurn: number, turnLimit: number, population: number, energy: EnergyResourceDTO, resources: ResourceDTO[]) {
		this.currentTurn = currentTurn;
		this.turnLimit = turnLimit;
		this.population = population;
		this.energy = energy;
		this.resources = resources;
	}

	public static from(state: GameState) {
		return new GameStateDTO(
			 state.currentTurn,
			 state.turnLimit,
			 state.population,
			 EnergyResourceDTO.from(state.energy),
			 state.resources.getAll().map(ResourceDTO.from)
		);
	}
}
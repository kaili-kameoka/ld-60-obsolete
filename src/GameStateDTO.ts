import type GameState from "./GameState.ts";
import ResourceDTO from "./ResourceDTO.ts";
import EnergyResourceDTO from "./EnergyResourceDTO.ts";

export default class GameStateDTO {
	public readonly currentTurn: number;
	public readonly population: number;
	public readonly energy: EnergyResourceDTO
	public readonly resources: ResourceDTO[];

	private constructor(currentTurn: number, population: number, energy: EnergyResourceDTO, resources: ResourceDTO[]) {
		this.currentTurn = currentTurn;
		this.population = population;
		this.energy = energy;
		this.resources = resources;
	}

	public static from(state: GameState) {
		return new GameStateDTO(
			 state.currentTurn,
			 state.population,
			 EnergyResourceDTO.from(state.energy),
			 state.resources.getAll().map(ResourceDTO.from)
		);
	}
}
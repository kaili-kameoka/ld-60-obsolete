import type Resource from "./Resource.ts";
import EnergyResource from "./EnergyResource.ts";
import type {ResourceName} from "./ResourceNames.ts";

export default  class GameState {
	private currentTurn: number;
	private readonly energy: EnergyResource;
	private resources: Map<ResourceName, Resource>;

	private static gameState: GameState | null;

	private constructor() {
		this.currentTurn = 1;
		this.energy = new EnergyResource();
		this.resources = new Map<ResourceName, Resource>();
	}

	public incrementTurn() {
		this.currentTurn++;
	}

	public getCurrentTurn() {
		return this.currentTurn;
	}

	public getEnergy() {
		return this.energy;
	}

	public nextTurn() {
		this.incrementTurn();
		this.energy.resetEnergy();
	}

	public addResource(resource: Resource) {
		this.resources.set(resource.name, resource);
	}

	public getResourceByName(name: ResourceName) {
		const resource = this.resources.get(name);
		if(!resource) throw new Error("Resource not found");
		return resource;
	}

	public getResources() {
		return [...this.resources.values()];
	}

	public static getGameState() {
		if (!GameState.gameState) {
			GameState.gameState = new GameState();
		}

		return GameState.gameState;
	}
}
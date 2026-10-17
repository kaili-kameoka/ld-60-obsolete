export default  class GameState {
	private currentTurn: number;
	private turnStartEnergy: number
	private energy: number;
	private wood: number;

	private static gameState: GameState | null;

	private constructor() {
		this.currentTurn = 1;
		this.turnStartEnergy = 1;
		this.energy = this.turnStartEnergy;
		this.wood = 0;
	}

	public incrementTurn() {
		this.currentTurn++;
	}

	public increaseTurnStartEnergyBy(increase: number) {
		this.turnStartEnergy += increase;
	}

	public decreaseEnergyBy(decrease: number) {
		this.energy -= decrease;
	}

	public increaseWoodBy(increase: number) {
		this.wood += increase;
	}

	public decreaseWoodBy(decrease: number) {
		this.wood -= decrease;
	}

	public getCurrentTurn() {
		return this.currentTurn;
	}

	public getStartTurnEnergy() {
		return this.turnStartEnergy;
	}

	public getEnergy() {
		return this.energy;
	}

	public getWood() {
		return this.wood;
	}

	public hasEnergy(amount: number) {
		return this.energy >= amount;
	}

	public static getGameState() {
		if (!GameState.gameState) {
			GameState.gameState = new GameState();
		}

		return GameState.gameState;
	}
}
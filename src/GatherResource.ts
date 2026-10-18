import type GameState from "./GameState.ts";
import type Action from "./Action.ts";
import type GatherActionConfig from "./GatherActionConfig.ts";

export default class GatherResource implements Action{
	private readonly gameState: GameState;
	private readonly config: GatherActionConfig;

	private readonly baseIncrease: number;

	constructor(gameState: GameState, baseIncrease: number, config: GatherActionConfig) {
		this.gameState = gameState;
		this.baseIncrease = baseIncrease;
		this.config = config;
	}

	public canExecute() {
		return this.gameState.energy.hasQuantity(this.config.energyCost)
	}

	public execute() {
		if(this.canExecute()) {
			this.gameState.energy.decreaseQuantityBy(this.config.energyCost);
			const increase = this.config.itemBonuses.reduce(
				 (total, {itemName, amount}) =>
					  total + amount * this.gameState.items.getEntry(itemName).getQuantity(),
				 this.baseIncrease
			);
			this.gameState.resources.getEntry("Wood")?.increaseQuantityBy(increase);
		}
	}
}
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

	private hasRequiredItem() {
		const {requiredItem} = this.config;
		return !requiredItem || this.gameState.items.getEntry(requiredItem).getQuantity() > 0;
	}

	public canExecute() {
		return this.hasRequiredItem() && this.gameState.energy.hasQuantity(this.config.energyCost)
	}

	public execute() {
		if (!this.hasRequiredItem()) return `You need a ${this.config.requiredItem} first.`;
		if(this.canExecute()) {
			this.gameState.energy.decreaseQuantityBy(this.config.energyCost);
			const increase = this.config.itemBonuses.reduce(
				 (total, {itemName, amount}) =>
					  total + amount * this.gameState.items.getEntry(itemName).getQuantity(),
				 this.baseIncrease
			);
			this.gameState.resources.getEntry(this.config.resourceName)?.increaseQuantityBy(increase);
			return `Gathered ${increase} ${this.config.resourceName}`
		}
		return `Could not gather ${this.config.resourceName} needs ${this.config.energyCost} Energy`
	}
}
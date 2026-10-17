import type GameState from "./GameState.ts";
import type ActionsView from "./ActionsView.ts";
import type GameStateView from "./GameStateView.ts";
import type GatherWood from "./GatherWood.ts";
import GameStateDTO from "./GameStateDTO.ts";

export default class GameController {
	private readonly gameState: GameState;
	private readonly gatherWood: GatherWood;
	private readonly actionsView: ActionsView
	private readonly gameStateView: GameStateView;

	constructor(gameState: GameState, gatherWood: GatherWood, actionsView: ActionsView, gameStateView: GameStateView) {
		this.gameState = gameState;
		this.gatherWood = gatherWood;
		this.actionsView = actionsView;
		this.gameStateView = gameStateView;

		this.actionsView.onGatherWood(() => this.handleGatherWood());
	}

	public refresh() {
		this.gameStateView.render(GameStateDTO.from(this.gameState));
		this.actionsView.setGatherWoodEnabled(this.gatherWood.canExecute());
	}

	private handleGatherWood() {
		this.gatherWood.execute();
		this.refresh();
	}
}
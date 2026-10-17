import type GameState from "./GameState.ts";
import type ActionsView from "./ActionsView.ts";
import type GameStateView from "./GameStateView.ts";
import GameStateDTO from "./GameStateDTO.ts";
import type ActionButton from "./ActionButton.ts";
import type ActionBinding from "./ActionBinding.ts";
import type Action from "./Action.ts";

export default class GameController {
	private readonly gameState: GameState;
	private readonly gameStateView: GameStateView;
	private readonly buttons: {action: Action, button: ActionButton}[];

	constructor(gameState: GameState, actionsView: ActionsView, gameStateView: GameStateView, bindings: ActionBinding[]) {
		this.gameState = gameState;
		this.buttons = [];
		this.gameStateView = gameStateView;

		for (const {label, action} of bindings) {
			const button = actionsView.addButton(label, () => {
				action.execute();
				this.refresh();
			});

			this.buttons.push({action, button})
		}
	}

	public refresh() {
		this.gameStateView.render(GameStateDTO.from(this.gameState));
		for (const {action, button} of this.buttons) {
			button.setEnabled(action.canExecute());
		}
	}
}
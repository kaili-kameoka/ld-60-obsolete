import type GameState from "./GameState.ts";
import type ActionsView from "./ActionsView.ts";
import type GameStateView from "./GameStateView.ts";
import GameStateDTO from "./GameStateDTO.ts";
import type ActionButton from "./ActionButton.ts";
import type ActionBinding from "./ActionBinding.ts";
import type Action from "./Action.ts";
import type LogView from "./LogView.ts";

export default class GameController {
	private readonly gameState: GameState;
	private readonly logView: LogView;
	private readonly gameStateView: GameStateView;
	private readonly buttons: { action: Action, button: ActionButton }[];

	constructor(gameState: GameState, logView: LogView, gameStateView: GameStateView) {
		this.gameState = gameState;
		this.logView = logView;
		this.buttons = [];
		this.gameStateView = gameStateView;
	}

	public addActions(actionsView: ActionsView, bindings: ActionBinding[]) {
		for (const {label, action} of bindings) {
			const button = actionsView.addButton(label, () => {
				if (this.gameState.status !== 'Playing') {
					this.logView.addLogEntry('The game is over.');
					return;
				}

				this.logView.addLogEntry(action.execute());
				this.logEndMessage();
				this.refresh();
			});

			this.buttons.push({action, button})
		}
	}


	private logEndMessage() {
		const {status} = this.gameState;
		if (status === 'Win') this.logView.addLogEntry('The Data Center hums to life. You win!');
		if (status === 'Lose') this.logView.addLogEntry('Out of time. The Data center was never built.');
	}

	public refresh() {
		this.gameStateView.render(GameStateDTO.from(this.gameState));
		const playing = this.gameState.status === 'Playing';
		for (const {action, button} of this.buttons) {
			button.setEnabled(playing && action.canExecute());
		}
	}
}
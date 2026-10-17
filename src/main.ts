import GameState from "./GameState.ts";
import GameStateView from "./GameStateView.ts";
import GatherWood from "./GatherWood.ts";
import ActionsView from "./ActionsView.ts";
import GameController from "./GameController.ts";

const gameState = GameState.getGameState();

function main() {
	const root = document.getElementById('app');
	if (!root) {
		console.error('Root Element Not Found');
		return;
	}

	const gameStateView = new GameStateView();
	const actionsView = new ActionsView();
	const gatherWood = new GatherWood(gameState);
	const gameController = new GameController(gameState, gatherWood, actionsView, gameStateView)
	gameController.refresh();
	root.append(gameStateView.table, actionsView.element);

}

main();
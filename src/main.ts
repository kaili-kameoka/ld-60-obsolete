import GameState from "./GameState.ts";
import GameStateView from "./GameStateView.ts";
import GatherWood from "./GatherWood.ts";
import ActionsView from "./ActionsView.ts";
import GameController from "./GameController.ts";
import Rest from "./Rest.ts";
import type ActionBinding from "./ActionBinding.ts";
import Resource from "./Resource.ts";

const gameState = GameState.getGameState();
gameState.addResource(new Resource("Wood"));

function main() {
	const root = document.getElementById('app');
	if (!root) {
		console.error('Root Element Not Found');
		return;
	}

	const gameStateView = new GameStateView();
	const actionsView = new ActionsView();
	const actionBindings: ActionBinding[] = [
		 {label: "Gather Wood", action: new GatherWood(gameState)},
		{ label: "Rest", action: new Rest(gameState)}
	];
	const gameController = new GameController(gameState, actionsView, gameStateView, actionBindings)
	gameController.refresh();
	root.append(gameStateView.table, actionsView.element);

}

main();
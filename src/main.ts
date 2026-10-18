import GameState from "./GameState.ts";
import GameStateView from "./GameStateView.ts";
import GatherResource from "./GatherResource.ts";
import ActionsView from "./ActionsView.ts";
import GameController from "./GameController.ts";
import Rest from "./Rest.ts";
import type ActionBinding from "./ActionBinding.ts";
import Resource from "./Resource.ts";
import Item from "./Item.ts";
import BuyItem from "./BuyItem.ts";

const gameState = new GameState();
gameState.resources.addEntry(new Resource("Wood"));
gameState.items.addEntry(new Item("Cart", 1, [{name: "Wood", cost: 5}]));
gameState.items.addEntry(new Item('Hut', 10, [{name: "Wood", cost: 10}]));

function main() {
	const root = document.getElementById('app');
	if (!root) {
		console.error('Root Element Not Found');
		return;
	}

	const gameStateView = new GameStateView();
	const actionsView = new ActionsView();
	const actionBindings: ActionBinding[] = [
		{label: "Gather Wood",
			action: new GatherResource(gameState, 5,
				 {resourceName: 'Wood', amount: 0, energyCost: 1, itemBonuses: [{itemName: "Cart", amount: 5}]})
		},
		{label: "Buy Cart", action: new BuyItem(gameState, 'Cart')},
		{label: "Build Hut", action: new BuyItem(gameState, 'Hut')},
		{label: "Rest", action: new Rest(gameState)}
	];
	const gameController = new GameController(gameState, actionsView, gameStateView, actionBindings)
	gameController.refresh();
	root.append(gameStateView.table, actionsView.element);

}

main();
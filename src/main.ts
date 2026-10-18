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
import LogView from "./LogView.ts";
import {resources, items, gatherActions} from "./GameData.ts";

const gameState = new GameState();
for (const name of resources) gameState.resources.addEntry(new Resource(name));

for (const {name, limit, cost, requiredItem, message} of items) gameState.items.addEntry(new Item(name, limit, cost, requiredItem, message));

function main() {
	const root = document.getElementById('app');
	if (!root) {
		console.error('Root Element Not Found');
		return;
	}

	const logView = new LogView();
	const gameStateView = new GameStateView();
	const actionsView = new ActionsView('Actions');
	const actionBindings: ActionBinding[] = [
		{label: 'Rest', action: new Rest(gameState)},
		...gatherActions.map(({label, baseIncrease, config}) =>
			 ({label, action: new GatherResource(gameState, baseIncrease, config)})),
	];
	const shopActionsView = new ActionsView('Shop');
	const shopActionBindings: ActionBinding[] = items.map(({name, verb}) =>
		 ({label: `${verb} ${name}`, action: new BuyItem(gameState, name)}));

	const gameController = new GameController(gameState, logView, gameStateView);
	gameController.addActions(actionsView, actionBindings);
	gameController.addActions(shopActionsView, shopActionBindings)
	gameController.refresh();

	const gameTitle = document.createElement('h1')
	gameTitle.innerHTML = 'Obsolete';
	root.append(gameTitle, logView.element, gameStateView.element, actionsView.element, shopActionsView.element);

}

main();
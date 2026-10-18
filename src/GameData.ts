import type {ResourceName} from "./ResourceNames.ts";
import type {ItemNames} from "./ItemNames.ts";
import type {ItemCost} from "./ItemCost.ts";
import type GatherActionConfig from "./GatherActionConfig.ts";

type ItemData = { name: ItemNames, limit: number, cost: ItemCost, verb: string };
type GatherData = { label: string, baseIncrease: number, config: GatherActionConfig };

export const resources = ['Wood', 'Food', 'Metal', 'Coal', 'Power'] satisfies ResourceName[];

export const items = [
	{name: 'Cart', limit: 1, verb: 'Buy', cost: [{name: 'Wood', cost: 5}]},
	{name: 'Hut', limit: 10, verb: 'Build', cost: [{name: 'Wood', cost: 10}]},
	{name: 'Farm', limit: 1, verb: 'Build', cost: [{name: 'Wood', cost: 15}]},
	{name: 'Forge', limit: 1, verb: 'Build', cost: [{name: 'Wood', cost: 15}, {name: "Food", cost: 20}]},
	{name: 'Steam Engine', limit: 1, verb: 'Build', cost: [{name: 'Wood', cost: 15}, {name: "Metal", cost: 20}]},
	{name: 'Generator', limit: 1, verb: 'Build', cost: [{name: 'Wood', cost: 15}, {name: "Coal", cost: 20}]},
	{name: 'Mainframe', limit: 1, verb: 'Build', cost: [{name: 'Wood', cost: 15}, {name: "Power", cost: 20}]},
] satisfies ItemData[];

export const gatherActions = [
	{
		label: 'Gather Wood', baseIncrease: 5,
		config: {resourceName: 'Wood', amount: 0, energyCost: 1, itemBonuses: [{itemName: 'Cart', amount: 5}]}
	},
	{
		label: 'Harvest Food', baseIncrease: 5,
		config: {
			resourceName: 'Food',
			amount: 0,
			energyCost: 1,
			requiredItem: 'Farm',
			itemBonuses: [{itemName: 'Farm', amount: 5}]
		}
	},
	{
		label: 'Produce Metal', baseIncrease: 5,
		config: {
			resourceName: 'Metal',
			amount: 0,
			energyCost: 1,
			requiredItem: 'Forge',
			itemBonuses: [{itemName: 'Forge', amount: 5}]
		}
	},
	{
		label: 'Produce Coal', baseIncrease: 5,
		config: {
			resourceName: 'Coal',
			amount: 0,
			energyCost: 1,
			requiredItem: 'Steam Engine',
			itemBonuses: [{itemName: 'Forge', amount: 5}]
		}
	},
	{
		label: 'Generate Power', baseIncrease: 5,
		config: {
			resourceName: 'Power',
			amount: 0,
			energyCost: 1,
			requiredItem: 'Generator',
			itemBonuses: [{itemName: 'Forge', amount: 5}]
		}
	},
] satisfies GatherData[];
import type {ResourceName} from "./ResourceNames.ts";
import type {ItemNames} from "./ItemNames.ts";
import type {ItemCost} from "./ItemCost.ts";
import type GatherActionConfig from "./GatherActionConfig.ts";
import type ActionBinding from "./ActionBinding.ts";

type ItemData = {
	name: ItemNames,
	limit: number,
	cost: ItemCost,
	requiredItem?: ItemNames,
	message?: string,
	action?: ActionBinding[]
};
type GatherData = { label: string, baseIncrease: number, config: GatherActionConfig };

export const resources = ['Wood', 'Food', 'Metal', 'Coal', 'Power', "Data"] satisfies ResourceName[];

export const items: ItemData[] = [
	{name: 'Cart', limit: 1, cost: [{name: 'Wood', cost: 5}]},
	{name: 'Hut', limit: 10, cost: [{name: 'Wood', cost: 15}]},
	{name: 'Farm', limit: 1, cost: [{name: 'Wood', cost: 20}]},
	{name: 'Forge', limit: 1, cost: [{name: 'Wood', cost: 25}, {name: 'Food', cost: 25}]},
	{name: 'Steam Engine', limit: 1, cost: [{name: 'Wood', cost: 35}, {name: 'Metal', cost: 35}]},
	{name: 'Steam Saw', limit: 1, requiredItem: 'Steam Engine',
		cost: [{name: 'Metal', cost: 10}, {name: 'Coal', cost: 10}],
		message: 'The steam saw tears through the forest.'},
	{name: 'Steam Plow', limit: 1, requiredItem: 'Steam Engine',
		cost: [{name: 'Metal', cost: 10}, {name: 'Coal', cost: 10}],
		message: 'The steam plow is too heavy for the soil. Harvests drop. Some fields need a lighter touch.'},
	{name: 'Generator', limit: 1, cost: [{name: 'Metal', cost: 45}, {name: 'Coal', cost: 45}]},
	{name: 'Electric Forge', limit: 1, requiredItem: 'Generator',
		cost: [{name: 'Metal', cost: 10}, {name: 'Power', cost: 10}],
		message: 'Electric heat makes cleaner metal, faster.'},
	{name: 'Electric Scarecrow', limit: 1, requiredItem: 'Generator',
		cost: [{name: 'Metal', cost: 10}, {name: 'Power', cost: 10}],
		message: "The crows aren't impressed. Neither is anyone else."},
	{name: 'Mainframe', limit: 1, cost: [{name: 'Wood', cost: 55}, {name: 'Metal', cost: 55}, {name: 'Power', cost: 55}]},
	{name: 'Mainframe Lumber Scheduler', limit: 1, requiredItem: 'Mainframe',
		cost: [{name: 'Power', cost: 10}, {name: 'Data', cost: 10}],
		message: 'The lumberjacks now spend half their day filling out punch cards.'},
	{name: 'Mainframe Grid Optimizer', limit: 1, requiredItem: 'Mainframe',
		cost: [{name: 'Power', cost: 10}, {name: 'Data', cost: 10}],
		message: "The Mainframe balances the power grid. Turns out it's good at math."},
	{name: 'Data Center', limit: 1, cost: [{name: 'Wood', cost: 70}, {name: 'Food', cost: 70}, {name: 'Power', cost: 70}, {name: 'Data', cost: 70}]},
];

export const gatherActions = [
	{
		label: 'Gather Wood', baseIncrease: 5,
		config: {
			resourceName: 'Wood',
			amount: 0,
			energyCost: 1,
			itemBonuses: [
				{itemName: 'Cart', amount: 5},
				{itemName: 'Steam Saw', amount: 10},
				{itemName: 'Mainframe Lumber Scheduler', amount: -5},
			]
		}
	},
	{
		label: 'Harvest Food', baseIncrease: 5,
		config: {
			resourceName: 'Food',
			amount: 0,
			energyCost: 1,
			requiredItem: 'Farm',
			itemBonuses: [
				{itemName: 'Farm', amount: 5},
				{itemName: 'Steam Plow', amount: -5},
				{itemName: 'Electric Scarecrow', amount: 0},
			]
		}
	},
	{
		label: 'Produce Metal', baseIncrease: 5,
		config: {
			resourceName: 'Metal',
			amount: 0,
			energyCost: 1,
			requiredItem: 'Forge',
			itemBonuses: [
				{itemName: 'Forge', amount: 5},
				{itemName: 'Electric Forge', amount: 10},
			]
		}
	},
	{
		label: 'Produce Coal', baseIncrease: 5,
		config: {
			resourceName: 'Coal',
			amount: 0,
			energyCost: 1,
			requiredItem: 'Steam Engine',
			itemBonuses: [
				{itemName: 'Steam Engine', amount: 5}
			]
		}
	},
	{
		label: 'Generate Power', baseIncrease: 5,
		config: {
			resourceName: 'Power',
			amount: 0,
			energyCost: 1,
			requiredItem: 'Generator',
			itemBonuses: [
				{itemName: 'Generator', amount: 5},
				{itemName: 'Mainframe Grid Optimizer', amount: 10},
			]
		}
	},
	{
		label: 'Gather Data', baseIncrease: 5,
		config: {
			resourceName: 'Data',
			amount: 0,
			energyCost: 1,
			requiredItem: 'Mainframe',
			itemBonuses: [{itemName: 'Mainframe', amount: 5}]
		}
	},
] satisfies GatherData[];
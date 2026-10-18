import type {ResourceName} from "./ResourceNames.ts";
import type {ItemNames} from "./ItemNames.ts";

export default interface GatherActionConfig {
	resourceName: ResourceName;
	amount: number;
	energyCost: number;
	itemBonuses: readonly {itemName: ItemNames, amount: number}[]
}
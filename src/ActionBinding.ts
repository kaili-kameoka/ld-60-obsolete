import type Action from "./Action.ts";

export default interface ActionBinding {
	label: string;
	action: Action;
}
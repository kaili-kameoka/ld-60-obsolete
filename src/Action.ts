export default interface Action {
	isAvailable?: () => boolean;
	getDetails?: () => string;
	canExecute: () => boolean;
	execute: () => string;
}
export default interface Action {
	canExecute: () => boolean;
	execute: () => string;
}
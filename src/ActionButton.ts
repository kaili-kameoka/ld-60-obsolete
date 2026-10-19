export default interface ActionButton {
	setEnabled: (enabled: boolean) => void;
	setLabel: (label: string) => void;
	setVisible: (visible: boolean) => void;
}
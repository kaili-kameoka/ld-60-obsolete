import type Resource from "./Resource.ts";
import type {ResourceName} from "./ResourceNames.ts";

export default class ResourceDTO {
	public readonly name: ResourceName;
	public readonly quantity: number;

	private constructor(name: ResourceName, quantity: number) {
		this.name = name;
		this.quantity = quantity;
	}

	public static from(resource: Resource) {
		return new ResourceDTO(resource.name, resource.getQuantity());
	}
}
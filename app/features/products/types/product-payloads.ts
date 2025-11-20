import type { Product } from "./product";

// Shape expected when creating a product via the API
export interface CreateProductPayload {
	title: Product["title"];
	shortDescription: Product["shortDescription"];
	longDescription: Product["longDescription"];
	price: Product["price"];
	slug: Product["slug"];
	specs: Product["specs"];
	reviews: Product["reviews"];
	images: Product["images"];
}

// For updates, we usually want partial (not everything required)
export type UpdateProductPayload = Partial<CreateProductPayload>;

// Import Product from the schema (single source of truth)
import type { Product as SchemaProduct } from "../features/products/schemas/product.schema";

// Re-export so the rest of the app can import Product from here
export type Product = SchemaProduct;

// Product with MongoDB _id
export type ProductWithId = Product & { _id: string };

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

// Partial version for updates
export type UpdateProductPayload = Partial<CreateProductPayload>;

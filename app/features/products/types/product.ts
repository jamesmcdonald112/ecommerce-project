export type { Product } from "@/app/features/products/schemas/product.schema";

export interface CreateProductPayload {
	title: string;
	shortDescription: string;
	longDescription: string;
	price: number;
	slug: string;
	specs: Record<string, string>;
	reviews: string[];
	images: string[];
}

export type UpdateProductPayload = CreateProductPayload;

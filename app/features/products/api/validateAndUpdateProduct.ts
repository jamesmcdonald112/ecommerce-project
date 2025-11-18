import type { HydratedDocument } from "mongoose";
import type { Product } from "../types/product";
import { getProductBySlug } from "./getProductBySlug";
import { updateProduct } from "./updateProduct";

export async function validateAndUpdateProduct(
	slug: string,
	updates: Partial<Product>,
): Promise<HydratedDocument<Product>> {
	// Check if slug is being changed
	if (updates.slug && updates.slug !== slug) {
		const slugExists = await getProductBySlug(updates.slug);
		if (slugExists) {
			throw new Error("Slug already exists");
		}
	}

	// Update the product
	const updatedProduct = await updateProduct(slug, updates);

	if (!updatedProduct) {
		throw new Error(`Product not found for slug: ${slug}`);
	}

	return updatedProduct;
}

/**
 * API client for product operations
 * Handles both creation and updates of products
 */

import type {
	CreateProductPayload,
	UpdateProductPayload,
} from "../types/product-payloads";

/**
 * Creates a new product via API
 * @throws Error if the API request fails
 */
export async function createProduct(
	payload: CreateProductPayload,
): Promise<void> {
	const response = await fetch("/api/products", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (!response.ok) {
		const errorData = await response.json();
		const errorMessage =
			errorData.error || "An error occurred while creating the product";
		throw new Error(errorMessage);
	}

	await response.json();
}

/**
 * Updates an existing product via API
 * @param slug - The slug of the product to update
 * @param payload - The updated product data
 * @throws Error if the API request fails
 */
export async function updateProduct(
	slug: string,
	payload: UpdateProductPayload,
): Promise<void> {
	const response = await fetch(`/api/products/${slug}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (!response.ok) {
		const errorData = await response.json();
		const errorMessage =
			errorData.error || "An error occurred while updating the product";
		throw new Error(errorMessage);
	}

	await response.json();
}

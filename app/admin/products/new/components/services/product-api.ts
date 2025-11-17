/**
 * API client for product operations
 */

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

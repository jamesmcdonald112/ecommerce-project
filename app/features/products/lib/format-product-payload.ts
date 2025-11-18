import type { Product, ProductFormData } from "@/app/features/products/schemas/product.schema";
import { convertSpecRowsToSpecs } from "./transform-spec-rows";

/**
 * Formats form data into the payload structure expected by the API
 * Handles transformation of spec rows and removes internal form fields
 */
export function formatProductPayload(formData: ProductFormData): Product {
	const specs = convertSpecRowsToSpecs(formData.specRows);

	const { specRows: _removed, ...rest } = formData;

	return {
		...rest,
		specs,
	} as Product;
}

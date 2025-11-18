import type { Product } from "@/app/features/products/schemas/product.schema";
import { convertSpecRowsToSpecs } from "./transform-spec-rows";

/**
 * Formats form data into the payload structure expected by the API
 * Handles transformation of spec rows and removes internal form fields
 */
export function formatProductPayload(formData: Product): Omit<
	Product,
	"specRows"
> & {
	specs: Record<string, string>;
} {
	const specs = convertSpecRowsToSpecs(formData.specRows);

	const { ...rest } = formData;

	return {
		...rest,
		specs,
	};
}

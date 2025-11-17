import type { z } from "zod";
import type { productSchema } from "@/app/features/products/schemas/product.schema";
import { convertSpecRowsToSpecs } from "./transform-spec-rows";

/**
 * Formats form data into the payload structure expected by the API
 * Handles transformation of spec rows and removes internal form fields
 */
export function formatProductPayload(
	formData: z.infer<typeof productSchema>,
): Omit<z.infer<typeof productSchema>, "specRows"> & {
	specs: Record<string, string>;
} {
	const specs = convertSpecRowsToSpecs(formData.specRows);

	const { ...rest } = formData;

	return {
		...rest,
		specs,
	};
}

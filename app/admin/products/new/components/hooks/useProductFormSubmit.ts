import { useCallback } from "react";
import type { UseFormReset } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import type { productSchema } from "@/app/features/products/schemas/product.schema";
import { formatProductPayload } from "../lib/format-product-payload";
import type { CreateProductPayload } from "../services/product-api";
import { createProduct } from "../services/product-api";

/**
 * Custom hook for handling product form submission
 * Handles data transformation, API calls, and user feedback
 */
export function useProductFormSubmit(
	reset: UseFormReset<z.infer<typeof productSchema>>,
) {
	const onSubmit = useCallback(
		async (formData: z.infer<typeof productSchema>): Promise<void> => {
			try {
				const payload = formatProductPayload(formData);
				await createProduct(payload as CreateProductPayload);

				toast.success("Product created successfully", {
					description: `"${formData.title}" has been added to your catalog`,
					position: "bottom-right",
				});

				reset();
			} catch (error) {
				const errorMessage =
					error instanceof Error ? error.message : "Unknown error occurred";
				toast.error("Failed to create product", {
					description: errorMessage,
					position: "bottom-right",
				});
			}
		},
		[reset],
	);

	return onSubmit;
}

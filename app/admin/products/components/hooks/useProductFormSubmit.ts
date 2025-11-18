import { useCallback } from "react";
import type { UseFormReset } from "react-hook-form";
import { toast } from "sonner";
import { formatProductPayload } from "@/app/features/products/lib/format-product-payload";
import type { ProductFormData } from "@/app/features/products/schemas/product.schema";
import { createProduct } from "@/app/features/products/services/product-api";
import type { CreateProductPayload } from "@/app/features/products/types/product";

/**
 * Custom hook for handling product form submission
 * Handles data transformation, API calls, and user feedback
 */
export function useProductFormSubmit(reset: UseFormReset<ProductFormData>) {
	const onSubmit = useCallback(
		async (formData: ProductFormData): Promise<void> => {
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

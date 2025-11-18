import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";
import { formatProductPayload } from "@/app/features/products/lib/format-product-payload";
import type { ProductFormData } from "@/app/features/products/schemas/product.schema";
import { updateProduct } from "@/app/features/products/services/product-api";

/**
 * Custom hook for handling product edit form submission
 * Handles data transformation, API calls, and user feedback
 */
export function useProductEditFormSubmit(slug: string) {
	const router = useRouter();

	const onSubmit = useCallback(
		async (formData: ProductFormData): Promise<void> => {
			try {
				const payload = formatProductPayload(formData);

				await updateProduct(slug, payload);

				toast.success("Product updated successfully", {
					description: `"${formData.title}" has been updated`,
					position: "bottom-right",
				});

				// Refresh the page to show updated data
				router.refresh();
			} catch (error) {
				const errorMessage =
					error instanceof Error ? error.message : "Unknown error occurred";
				toast.error("Failed to update product", {
					description: errorMessage,
					position: "bottom-right",
				});
			}
		},
		[slug, router],
	);

	return onSubmit;
}

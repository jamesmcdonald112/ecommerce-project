import { z } from "zod";
import { PRODUCT_LIMITS } from "@/app/config/product-field-limits";

export const productSchema = z.object({
	title: z
		.string()
		.min(1, "Title is required")
		.max(
			PRODUCT_LIMITS.title,
			`Max ${PRODUCT_LIMITS.title} characters for title`,
		),
	shortDescription: z
		.string()
		.min(1, "Short description is required")
		.max(
			PRODUCT_LIMITS.shortDescription,
			`Max ${PRODUCT_LIMITS.shortDescription} characters for short description`,
		),
	longDescription: z
		.string()
		.min(1, "Long description is required")
		.max(
			PRODUCT_LIMITS.longDescription,
			`Max ${PRODUCT_LIMITS.longDescription} characters for long descriptions`,
		),
	specs: z.record(z.string(), z.string()),
	specRows: z.array(
		z.object({
			key: z.string().min(1, "Key is required"),
			value: z.string().min(1, "Value is required"),
		}),
	),
	reviews: z.array(
		z
			.string()
			.min(1, "Review cannot be empty")
			.max(
				PRODUCT_LIMITS.review,
				`Max ${PRODUCT_LIMITS.review} characters per review`,
			),
	),
	price: z.number().nonnegative("Price must be positive"),
	images: z
		.array(z.string().url("Invalid image URL"))
		.min(1, "At least one image is required"),
	slug: z.string().min(1, "Slug is required"),
});

export const updateProductSchema = productSchema.omit({ specRows: true });

export type Product = z.infer<typeof productSchema>;

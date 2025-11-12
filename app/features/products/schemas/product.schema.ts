import { z } from "zod";

export const productSchema = z.object({
	title: z
		.string()
		.min(1, "Title is required")
		.max(100, "Max 100 characters for title"),
	shortDescription: z
		.string()
		.min(1, "Short description is required")
		.max(300, "max 300 characters for short description"),
	longDescription: z
		.string()
		.min(1, "Long description is required")
		.max(3000, "max 3'000 characters for long descriptions"),
	specs: z.record(z.string(), z.string()).default({}), // maps of key: string
	reviews: z.array(z.string()).default([]),
	price: z.coerce.number().positive("Price must be positive"),
	images: z
		.array(z.string().url("Invalid image URL"))
		.min(1, "At least one image is required"),
	slug: z.string().min(1, "Slug is required"),
});

export type Product = z.infer<typeof productSchema>;

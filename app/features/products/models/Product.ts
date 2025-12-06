import mongoose, { model, Schema } from "mongoose";
import { PRODUCT_LIMITS } from "@/config/product-field-limits";
import type { Product } from "../schemas/product.schema";

const ProductSchema = new Schema<Product>(
	{
		title: {
			type: String,
			required: [true, "Please provide a title for this product"],
			maxLength: [
				PRODUCT_LIMITS.title,
				`Title cannot exceed ${PRODUCT_LIMITS.title} characters`,
			],
		},
		shortDescription: {
			type: String,
			required: [true, "Please provide a short description"],
			maxLength: [
				PRODUCT_LIMITS.shortDescription,
				`Short description cannot exceed ${PRODUCT_LIMITS.shortDescription} characters`,
			],
		},
		longDescription: {
			type: String,
			required: [true, "Please provide a detailed description"],
			maxLength: [
				PRODUCT_LIMITS.longDescription,
				`Long description cannot exceed ${PRODUCT_LIMITS.longDescription}} characters`,
			],
		},
		specs: {
			type: Map,
			of: String,
			default: {},
		},
		reviews: {
			type: [String],
			default: [],
		},
		price: {
			type: Number,
			required: [true, "Please provide a price"],
			min: [0, "Price cannot be negative"],
		},
		images: {
			type: [String],
			required: [true, "Please provide at least one image URL"],
		},
		slug: {
			type: String,
			required: [true, "Please provide a slug (unique identifier)"],
			unique: true,
		},
	},
	{ timestamps: true },
);

export const ProductModel =
	mongoose.models.Product || model<Product>("Product", ProductSchema);

import mongoose, { model, Schema } from "mongoose";
import type { Product } from "@/app/features/products/types/product";

const ProductSchema = new Schema<Product>(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for this product"],
      maxLength: [100, "Title cannot exceed 100 characters"],
    },
    shortDescription: {
      type: String,
      required: [true, "Please provide a short description"],
      maxLength: [300, "Short description cannot exceed 300 characters"],
    },
    longDescription: {
      type: String,
      required: [true, "Please provide a detailed description"],
      maxLength: [3000, "Long description cannot exceed 3000 characters"],
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
  { timestamps: true }
);

export const ProductModel =
  mongoose.models.Product || model<Product>("Product", ProductSchema);

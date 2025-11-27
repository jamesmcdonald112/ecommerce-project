import type { HydratedDocument } from "mongoose";
import dbConnect from "@/app/lib/mongodb";
import { ProductModel } from "../models/Product";
import type { Product } from "../schemas/product.schema";

export async function getProductBySlug(
	slug: string,
): Promise<HydratedDocument<Product> | null> {
	await dbConnect();
	return await ProductModel.findOne({ slug });
}

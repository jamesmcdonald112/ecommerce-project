import type { HydratedDocument } from "mongoose";
import dbConnect from "@/app/lib/mongodb";
import type { Product } from "../schemas/product.schema";
import { ProductModel } from "./models/Product";

export async function getProductBySlug(
	slug: string,
): Promise<HydratedDocument<Product> | null> {
	await dbConnect();
	return await ProductModel.findOne({ slug });
}

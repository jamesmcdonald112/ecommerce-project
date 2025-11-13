import dbConnect from "@/app/lib/mongodb";
import { ProductModel } from "../models/Product";
import type { Product } from "../schemas/product.schema";

export async function getAllProducts(): Promise<Product[]> {
	await dbConnect();
	return await ProductModel.find({});
}

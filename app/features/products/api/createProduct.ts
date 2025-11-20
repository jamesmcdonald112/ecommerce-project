import type { HydratedDocument } from "mongoose";
import dbConnect from "@/app/lib/mongodb";
import type { Product } from "../schemas/product.schema";
import { ProductModel } from "./models/Product";

export async function createProduct(
	product: Product,
): Promise<HydratedDocument<Product>> {
	await dbConnect();
	return await ProductModel.create(product);
}

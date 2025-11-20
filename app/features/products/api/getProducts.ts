import dbConnect from "@/app/lib/mongodb";
import type { Product } from "../schemas/product.schema";
import { ProductModel } from "./models/Product";

export async function getAllProducts(): Promise<Product[]> {
	await dbConnect();
	return await ProductModel.find({});
}

export async function getProductsBySearch(query: string): Promise<Product[]> {
	await dbConnect();
	if (query === "") return getAllProducts();
	else {
		return await ProductModel.find({
			$or: [
				{ title: { $regex: query, $options: "i" } },
				{ shortDescription: { $regex: query, $options: "i" } },
			],
		});
	}
}

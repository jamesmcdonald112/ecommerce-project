import type { HydratedDocument } from "mongoose";
import dbConnect from "@/app/lib/mongodb";
import type { Product } from "../schemas/product.schema";
import { ProductModel } from "./models/Product";

export async function updateProduct(
	slug: string,
	updates: Partial<Product>,
): Promise<HydratedDocument<Product> | null> {
	await dbConnect();

	// Convert specs object to Map if present, since Mongoose stores it as a Map
	const processedUpdates = { ...updates } as unknown as {
		specs?: Map<string, string>;
	};
	if (processedUpdates.specs && !(processedUpdates.specs instanceof Map)) {
		processedUpdates.specs = toSpecMap(updates.specs as Record<string, string>);
	}

	return await ProductModel.findOneAndUpdate({ slug }, processedUpdates, {
		new: true,
		runValidators: true,
	});
}

function toSpecMap(obj: Record<string, string>): Map<string, string> {
	return new Map(Object.entries(obj));
}

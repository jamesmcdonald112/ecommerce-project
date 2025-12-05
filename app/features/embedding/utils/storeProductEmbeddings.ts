import mongoose from "mongoose";
import dbConnect from "@/app/lib/mongodb";
import type { ProductWithId } from "@/app/types/product";
import ProductChunk from "../models/ProductChunk";
import { buildProductText } from "../utils/buildProductText";
import { chunkText } from "../utils/chunkText";
import { generateEmbedding } from "../utils/generateEmbedding";

export async function storeProductEmbeddings(
	product: ProductWithId,
): Promise<{ chunkCount: number }> {
	try {
		// Connect to Mongo (cached connection)
		await dbConnect();

		const cleanProduct = JSON.parse(JSON.stringify(product));
		const fullText: string = buildProductText(cleanProduct);

		// Split into char chunks
		const chunks: { text: string }[] = chunkText(fullText);

		if (chunks.length === 0) {
			return { chunkCount: 0 };
		}

		// Convert product._id (string) → MongoDB ObjectId type
		const productId = new mongoose.Types.ObjectId(product._id);

		// Delete old embeddings for that product
		await ProductChunk.deleteMany({ productId });

		// 6. Generate embedding for each chunk
		const docsToInsert = await Promise.all(
			chunks.map(async (chunk) => ({
				productId,
				text: chunk.text,
				embedding: await generateEmbedding(chunk.text),
			})),
		);

		// Insert all embedding chunks into Mongo
		await ProductChunk.insertMany(docsToInsert);

		return { chunkCount: docsToInsert.length };
	} catch (err) {
		console.error("Error storing product embeddings:", err);
		throw err; // rethrow so API route can handle it
	}
}

import type mongoose from "mongoose";
import { type NextRequest, NextResponse } from "next/server";
import ProductChunk from "@/app/features/embedding/models/ProductChunk";
import { generateEmbedding } from "@/app/features/embedding/utils/generateEmbedding";
import { ProductModel } from "@/app/features/products/models/Product";
import dbConnect from "@/app/lib/mongodb";
import type { ProductWithId } from "@/app/types/product";

type VectorSearchResult = {
	productId: mongoose.Types.ObjectId;
	text: string;
	score: number;
};

const MIN_SCORE = 0.63;

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const q = searchParams.get("q")?.trim() || null;

		if (!q) {
			return NextResponse.json(
				{ success: false, error: "Missing ?q search query" },
				{ status: 400 },
			);
		}

		await dbConnect();
		const queryEmbedding = await generateEmbedding(q);

		const results = (await ProductChunk.aggregate([
			{
				$vectorSearch: {
					index: "default",
					path: "embedding",
					queryVector: queryEmbedding,
					numCandidates: 50,
					limit: 10,
				},
			},
			{
				$project: {
					_id: 0,
					productId: 1,
					text: 1,
					score: { $meta: "vectorSearchScore" },
				},
			},
		])) as VectorSearchResult[];

		const filtered = results.filter((r) => r.score >= MIN_SCORE);

		const productIds = [
			...new Set(filtered.map((r) => r.productId.toString())),
		];

		if (productIds.length === 0) {
			return NextResponse.json({
				success: true,
				data: {
					products: [],
					meta: { query: q, totalProducts: 0 },
				},
			});
		}

		const products = await ProductModel.find({
			_id: { $in: productIds },
		}).lean<ProductWithId[]>();

		const rankedProducts: ProductWithId[] = productIds
			.map((id) => products.find((p) => p._id.toString() === id))
			.filter((p): p is ProductWithId => Boolean(p));

		return NextResponse.json({
			success: true,
			data: {
				products: rankedProducts,
				meta: {
					query: q,
					totalProducts: rankedProducts.length,
				},
			},
		});
	} catch (err) {
		console.error("Search API error:", err);
		return NextResponse.json(
			{ success: false, error: "Internal server error" },
			{ status: 500 },
		);
	}
}

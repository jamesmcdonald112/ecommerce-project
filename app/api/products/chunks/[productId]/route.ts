// app/api/products/chunks/[id]/route.ts

import mongoose from "mongoose";
import { type NextRequest, NextResponse } from "next/server";
import ProductChunk from "@/app/features/embedding/models/ProductChunk";
import dbConnect from "@/app/lib/mongodb";

interface ChunksRouteContext {
	params: Promise<{ productId: string }>;
}

export async function GET(_req: NextRequest, { params }: ChunksRouteContext) {
	try {
		const { productId } = await params;

		if (!productId) {
			return NextResponse.json(
				{ success: false, error: "Missing product ID" },
				{ status: 400 },
			);
		}

		// Ensure it's a valid ObjectId
		if (!mongoose.Types.ObjectId.isValid(productId)) {
			return NextResponse.json(
				{ success: false, error: "Invalid product ID" },
				{ status: 400 },
			);
		}

		await dbConnect();

		const chunks = await ProductChunk.find({
			productId: new mongoose.Types.ObjectId(productId),
		}).lean();

		return NextResponse.json({ success: true, data: chunks }, { status: 200 });
	} catch (err) {
		console.error("Chunk fetch failed:", err);
		return NextResponse.json(
			{ success: false, error: "Internal server error" },
			{ status: 500 },
		);
	}
}

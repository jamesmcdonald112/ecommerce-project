import type { HydratedDocument } from "mongoose";
import { type NextRequest, NextResponse } from "next/server";
import z, { ZodError } from "zod";
import { productSchema } from "@/app/features/products/schemas/product.schema";
import type { Product } from "@/app/types/product";
import { ProductModel } from "@/models/Product";
import dbConnect from "../../lib/mongodb";

export async function GET(): Promise<NextResponse> {
	try {
		await dbConnect();
		const items = await ProductModel.find({});
		return NextResponse.json({ success: true, data: items });
	} catch (error: unknown) {
		return handleError(error);
	}
}

export async function POST(request: NextRequest): Promise<NextResponse> {
	try {
		const json: unknown = await request.json();
		const parsedBody: Product = productSchema.parse(json);
		await dbConnect();
		const product: HydratedDocument<Product> =
			await ProductModel.create(parsedBody);
		return NextResponse.json({ success: true, data: product }, { status: 201 });
	} catch (error: unknown) {
		return handleError(error);
	}
}

function handleError(error: unknown, status = 500): NextResponse {
	if (error instanceof ZodError) {
		const tree = z.treeifyError(error);
		return NextResponse.json({ success: false, errors: tree }, { status: 400 });
	}
	const message = error instanceof Error ? error.message : "Unknown error";
	return NextResponse.json({ success: false, error: message }, { status });
}

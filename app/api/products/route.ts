import type { HydratedDocument } from "mongoose";
import { type NextRequest, NextResponse } from "next/server";
import z, { ZodError } from "zod";
import { createProduct } from "@/app/features/products/api/createProduct";
import { getProductsBySearch } from "@/app/features/products/api/getProducts";
import { productSchema } from "@/app/features/products/schemas/product.schema";
import type { Product } from "@/app/features/products/types/product";

export async function GET(request: NextRequest): Promise<NextResponse> {
	try {
		const searchParams = request.nextUrl.searchParams;
		const query: string = searchParams.get("q") || "";

		const products: Product[] = await getProductsBySearch(query);
		return NextResponse.json({ success: true, data: products });
	} catch (error: unknown) {
		return handleError(error);
	}
}

export async function POST(request: NextRequest): Promise<NextResponse> {
	try {
		const json: unknown = await request.json();
		const parsedBody: Product = productSchema.parse(json);
		const product: HydratedDocument<Product> = await createProduct(parsedBody);
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

import type { HydratedDocument } from "mongoose";
import { type NextRequest, NextResponse } from "next/server";
import z, { ZodError } from "zod";
import { getProductBySlug } from "@/app/features/products/api/getProductBySlug";
import { validateAndUpdateProduct } from "@/app/features/products/api/validateAndUpdateProduct";
import { BadRequestError, NotFoundError } from "@/app/features/products/errors";
import { updateProductSchema } from "@/app/features/products/schemas/product.schema";
import type { Product } from "@/app/features/products/types/product";

interface ProductRouteParams {
	params: Promise<{ slug: string }>;
}

export async function GET({
	params,
}: ProductRouteParams): Promise<NextResponse> {
	try {
		const { slug } = await params;

		const product: HydratedDocument<Product> | null =
			await getProductBySlug(slug);

		if (!product) {
			return NextResponse.json(
				{ success: false, error: `Product not found for slug: ${slug}` },
				{ status: 404 },
			);
		}

		return NextResponse.json({ success: true, data: product }, { status: 200 });
	} catch (error) {
		return handleError(error);
	}
}

export async function PUT(
	request: NextRequest,
	{ params }: ProductRouteParams,
): Promise<NextResponse> {
	try {
		const { slug } = await params;

		const json: unknown = await request.json();
		const parsedBody = updateProductSchema.parse(json);

		const updatedProduct = await validateAndUpdateProduct(slug, parsedBody);

		return NextResponse.json(
			{ success: true, data: updatedProduct },
			{ status: 200 },
		);
	} catch (error: unknown) {
		return handleError(error);
	}
}

function handleError(error: unknown): NextResponse {
	if (error instanceof ZodError) {
		return NextResponse.json(
			{ success: false, errors: z.treeifyError(error) },
			{ status: 400 },
		);
	}

	if (error instanceof BadRequestError) {
		return NextResponse.json(
			{ success: false, error: error.message },
			{ status: 400 },
		);
	}

	if (error instanceof NotFoundError) {
		return NextResponse.json(
			{ success: false, error: error.message },
			{ status: 404 },
		);
	}

	const message = error instanceof Error ? error.message : "Unknown error";

	return NextResponse.json({ success: false, error: message }, { status: 500 });
}

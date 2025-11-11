import { NextResponse } from "next/server";
import { Product } from "@/models/Product";
import dbConnect from "../../lib/mongodb";

export async function GET(): Promise<NextResponse> {
  try {
    await dbConnect();
    const items = await Product.find({});
    return NextResponse.json({ success: true, data: items });
  } catch (error: unknown) {
    return handleError(error);
  }
}

function handleError(error: unknown, status = 500): NextResponse {
	const message = error instanceof Error ? error.message : "Unknown error";
	return NextResponse.json({ success: false, error: message }, { status });
}


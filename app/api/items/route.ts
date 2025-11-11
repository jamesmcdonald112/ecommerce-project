import { NextResponse } from "next/server";
import Item from "@/models/Item";
import dbConnect from "../../lib/mongodb";

export async function GET(): Promise<NextResponse> {
	try {
		await dbConnect();
		const items = await Item.find({});
		return NextResponse.json({ success: true, data: items });
	} catch (error: unknown) {
		return handleError(error);
	}
}

function handleError(error: unknown, status = 500): NextResponse {
	return NextResponse.json(
		{ success: false, error: (error as Error).message },
		{ status },
	);
}

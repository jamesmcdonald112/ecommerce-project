import mongoose from "mongoose";
import { storeProductEmbeddings } from "@/app/features/embedding/utils/storeProductEmbeddings";
import dbConnect from "@/app/lib/mongodb";

async function run() {
	await dbConnect();
	console.log("Connected to MongoDB");

	const fakeProduct = {
		_id: new mongoose.Types.ObjectId().toString(),
		title: "Test Jacket",
		shortDescription: "Short desc",
		longDescription:
			"Long test description that is longer than 500 characters so chunking actually works. Add more text here if needed to force multiple chunks to be generated. Otherwise you may only get 1 chunk depending on your chunk size settings.",
		specs: {
			material: "cotton",
			color: "blue",
		},
		reviews: ["Great!", "Loved it!"],
		price: 49.99,
		images: ["https://example.com/image.jpg"],
		slug: "test-jacket",
	};

	console.log("Running embedding pipeline…");

	const result = await storeProductEmbeddings(fakeProduct);

	console.log("Pipeline complete.");
	console.log("Chunks created:", result);

	process.exit(0);
}

run().catch((err) => {
	console.error(err);
	process.exit(1);
});

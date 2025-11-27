import dbConnect from "@/app/lib/mongodb";
import { ProductModel } from "@/app/features/products/models/Product";
import ProductChunk from "@/app/features/embedding/models/ProductChunk";
import { storeProductEmbeddings } from "@/app/features/embedding/utils/storeProductEmbeddings";

async function run() {
  await dbConnect();

  console.log("Deleting old chunks…");
  await ProductChunk.deleteMany({});

  const products = await ProductModel.find({});
  console.log(`Found ${products.length} products`);

  for (const product of products) {
    console.log("Embedding:", product.title);
    await storeProductEmbeddings(product);
  }

  console.log("DONE");
  process.exit(0);
}

run();

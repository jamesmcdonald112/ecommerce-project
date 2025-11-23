import { notFound } from "next/navigation";

import ProductPageLayout from "@/app/features/products/components/ProductPageLayout";

export default async function ProductPage({
	params,
}: {
	params: { slug: string };
}) {
	const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
	const { slug } = await params;
	const res = await fetch(`${base}/api/products/${slug}`);
	const result = await res.json();

	if (!result.success) {
		notFound();
	}

	const product = result.data;

	console.log("Product", product);

	return <ProductPageLayout product={product} />;
}

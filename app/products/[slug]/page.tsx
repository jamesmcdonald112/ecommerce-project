import { notFound } from "next/navigation";

import ProductPageLayout from "@/app/features/products/components/ProductPageLayout";

export default async function ProductPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const base = process.env.NEXT_PUBLIC_BASE_URL;
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

import type { Product } from "../../products/schemas/product.schema";

export function mergeCartItems(
	cart: Record<string, number>,
	products: Product[],
) {
	return Object.entries(cart).map(([slug, quantity]) => {
		const product = products.find((p) => p.slug === slug);
		return { slug, quantity, product };
	});
}

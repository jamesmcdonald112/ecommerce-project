"use client";

import { useEffect, useState } from "react";
import DisplayProduct from "../features/cart/components/DisplayProduct";
import { getFromLocalStorage } from "../features/cart/utils/cart-storage";
import type { Product } from "../features/products/schemas/product.schema";

export default function CartPage() {
	const [cart, setCart] = useState<Record<string, number> | null>(null);
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		async function loadCartAndProducts() {
			// Load cart
			const stored = getFromLocalStorage<Record<string, number>>("cart");
			setCart(stored);

			if (!stored) {
				setProducts([]);
				return;
			}

			// Convert to entries + slugs
			const entries = Object.entries(stored);
			const slugs = entries.map(([slug]) => slug);

			// Fetch product data
			const results = await Promise.all(
				slugs.map(async (slug) => {
					const res = await fetch(`/api/products/${slug}`);
					const json = await res.json();
					return json.data;
				}),
			);

			setProducts(results);
		}

		loadCartAndProducts();
	}, []);

	const totalCount = cart
		? Object.values(cart).reduce((sum, qty) => sum + qty, 0)
		: 0;

	const entries = Object.entries(cart ?? {});

	const merged = entries.map(([slug, quantity]) => {
		const product = products.find((p) => p.slug === slug);
		return { slug, quantity, product };
	});

	return (
		<div>
			<h1>This is my cart</h1>
			<p>Total items: {totalCount}</p>

			{merged.map((item) => (
				<DisplayProduct
					key={item.slug}
					slug={item.slug}
					product={item.product}
					quantity={item.quantity}
				/>
			))}
		</div>
	);
}

"use client";

import { useEffect, useState } from "react";
import DisplayProduct from "../features/cart/components/DisplayProduct";
import { useCart } from "../features/cart/context/CartContext";
import type { Product } from "../features/products/schemas/product.schema";

export default function CartPage() {
	const { cart } = useCart();
	const [products, setProducts] = useState<Product[]>([]);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		async function loadProducts() {
			if (!cart || Object.keys(cart).length === 0) {
				setProducts([]);
				return;
			}

			// Convert to entries + slugs
			const entries = Object.entries(cart);
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

		loadProducts();
	}, [cart]);

	if (!mounted) {
		return (
			<div>
				<h1>This is my cart</h1>
				<p>Total items: 0</p>
			</div>
		);
	}

	const totalCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

	const entries = Object.entries(cart);

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

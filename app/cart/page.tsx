"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { fetchCartProducts } from "../features/cart/api/fetchCartProducts";
import DisplayProduct from "../features/cart/components/DisplayProduct";
import { useCart } from "../features/cart/context/CartContext";
import { mergeCartItems } from "../features/cart/lib/mergeCartItems";
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
			const results = await fetchCartProducts(slugs);

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

	const merged = mergeCartItems(cart, products);

	// --- EMPTY CART STATE ---
	if (merged.length === 0) {
		return (
			<div className="container mx-auto px-4 py-10 text-center">
				<h1 className="text-2xl font-semibold mb-4">Your cart is empty</h1>

				<p className="text-muted-foreground mb-6">
					Looks like you haven’t added anything yet.
				</p>

				<a
					href="/products"
					className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition"
				>
					Continue Shopping
				</a>
			</div>
		);
	}

	const totalPrice = merged.reduce((sum, item) => {
		if (!item.product) return sum;
		return sum + item.product.price * item.quantity;
	}, 0);

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

			<div className="mt-6 p-4 border-t flex justify-between items-center">
				<p className="text-lg font-semibold">Total Price</p>
				<p className="text-xl font-bold">€{totalPrice.toFixed(2)}</p>
			</div>

			<div className="flex gap-4 mt-6">
				<Button asChild variant="secondary">
					<Link href="/products">Continue Shopping</Link>
				</Button>

				<Button
					disabled
					className="bg-muted text-muted-foreground px-6 py-3 rounded-md cursor-not-allowed"
				>
					Checkout (Coming Soon)
				</Button>
			</div>
		</div>
	);
}

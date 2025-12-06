"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { fetchCartProducts } from "../features/cart/api/fetchCartProducts";
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
		<div className="bg-background">
			<div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
				<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
					Shopping Cart
				</h1>

				<div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr] lg:items-start">
					<section
						aria-label="Cart items"
						className="rounded-lg border border-border bg-card"
					>
						<ul className="divide-y divide-border">
							{merged.map((item) => (
								<CartLine key={item.slug} item={item} />
							))}
						</ul>
					</section>

					<section
						aria-label="Order summary"
						className="rounded-lg border border-border bg-card p-6 sm:p-8"
					>
						<h2 className="text-lg font-semibold">Order summary</h2>
						<dl className="mt-4 space-y-3 text-sm">
							<div className="flex items-center justify-between">
								<dt className="text-muted-foreground">Items</dt>
								<dd className="font-medium text-foreground">{totalCount}</dd>
							</div>
							<div className="flex items-center justify-between border-t border-border pt-3">
								<dt className="text-base font-semibold text-foreground">
									Order total
								</dt>
								<dd className="text-base font-semibold text-foreground">
									€{totalPrice.toFixed(2)}
								</dd>
							</div>
						</dl>
						<Button
							disabled
							className="mt-6 w-full cursor-not-allowed bg-muted text-muted-foreground"
						>
							Checkout (Coming soon)
						</Button>

						<div className="mt-6 text-center text-sm text-muted-foreground">
							<p>
								or{" "}
								<Link
									href="/products"
									className="font-medium text-primary hover:text-primary/80"
								>
									Continue shopping<span aria-hidden="true"> →</span>
								</Link>
							</p>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}

function CartLine({
	item,
}: {
	item: ReturnType<typeof mergeCartItems>[number];
}) {
	const { increase, decrease, remove } = useCart();
	const { slug, product, quantity } = item;
	const title = product?.title ?? "Unknown product";
	const price = product?.price ?? 0;
	const image = product?.images?.[0] ?? "/placeholder.svg";
	const description = product?.shortDescription ?? "No description available.";
	const lineTotal = price * quantity;

	const handleQuantityChange = (value: number) => {
		if (value <= 0) {
			remove(slug);
			return;
		}
		if (value === quantity) return;

		const diff = value - quantity;
		if (diff > 0) {
			for (let i = 0; i < diff; i++) increase(slug);
		} else {
			for (let i = 0; i < Math.abs(diff); i++) decrease(slug);
		}
	};

	return (
		<li className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:gap-6 sm:p-6">
			<div className="shrink-0">
				<div className="relative h-24 w-24 overflow-hidden rounded-lg bg-muted sm:h-32 sm:w-32">
					<Image
						src={image}
						alt={title}
						width={128}
						height={128}
						className="h-full w-full object-cover"
						loading="lazy"
					/>
				</div>
			</div>

			<div className="flex flex-1 flex-col justify-between">
				<div className="flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:items-start">
					<div className="pr-0 sm:pr-6">
						<h3 className="text-sm font-medium text-foreground">
							<Link href={`/products/${slug}`} className="hover:text-primary">
								{title}
							</Link>
						</h3>
						<p className="mt-1 text-sm text-muted-foreground line-clamp-2">
							{description}
						</p>
					</div>
					<div className="text-right text-sm text-foreground sm:text-base">
						<p className="font-semibold">€{lineTotal.toFixed(2)}</p>
						<p className="text-xs text-muted-foreground">
							€{price.toFixed(2)} each
						</p>
					</div>
				</div>

				<div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground sm:mt-4">
					<div className="inline-grid w-24 grid-cols-1">
						<select
							aria-label={`Quantity for ${title}`}
							className="col-start-1 row-start-1 appearance-none rounded-md border border-border bg-background py-1.5 pr-8 pl-3 text-sm text-foreground"
							value={quantity}
							onChange={(e) => handleQuantityChange(Number(e.target.value))}
						>
							{Array.from({ length: 8 }).map((_, i) => (
								<option key={`qty-${i + 1}`} value={i + 1}>
									{i + 1}
								</option>
							))}
						</select>
						<svg
							viewBox="0 0 16 16"
							fill="currentColor"
							aria-hidden="true"
							className="pointer-events-none col-start-1 row-start-1 mr-2 h-4 w-4 self-center justify-self-end text-muted-foreground"
						>
							<path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" />
						</svg>
					</div>
					<button
						type="button"
						onClick={() => remove(slug)}
						className="text-sm font-medium text-primary hover:text-primary/80"
					>
						Remove
					</button>
				</div>
			</div>
		</li>
	);
}

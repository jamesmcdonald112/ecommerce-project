"use client";

import { Button } from "@/components/ui/button";
import type { Product } from "../../products/schemas/product.schema";
import { useCart } from "../context/CartContext";

interface AddToCartButtonProps {
	product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
	const { addItem } = useCart();

	function handleClick() {
		addItem(product.slug);
	}

	return (
		<Button
			onClick={handleClick}
			size="lg"
			className="w-full bg-primary text-primary-foreground px-6 py-2 rounded-md md:flex-1"
		>
			Add to Cart
		</Button>
	);
}

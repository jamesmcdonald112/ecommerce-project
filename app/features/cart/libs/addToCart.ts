"use client";

import type { Product } from "../../products/schemas/product.schema";
import { addToLocalStorage, getFromLocalStorage } from "../utils/cart-storage";

export function addToCart(item: Product): void {
	try {
		let cart = getFromLocalStorage<Record<string, number>>("cart");

		// If nothing in cart yet, create an empty object
		if (!cart) cart = {};

		const { slug } = item;

		// If item exists, increase quantity
		if (cart[slug]) {
			cart[slug]++;
		} else {
			// If new item, start at 1.
			cart[slug] = 1;
		}

		// Save updated cart back to local storage
		addToLocalStorage({
			key: "cart",
			value: cart,
		});

		console.log("Updated cart: ", cart);
	} catch (error: unknown) {
		console.error("addToCart failed:", error);
		return;
	}
}

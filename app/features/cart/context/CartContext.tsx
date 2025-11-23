"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { addToLocalStorage, getFromLocalStorage } from "../utils/cart-storage";

type CartState = Record<string, number>;

interface CartContextValue {
	cart: CartState;
	totalCount: number;
	addItem: (slug: string) => void;
	increase: (slug: string) => void;
	decrease: (slug: string) => void;
	remove: (slug: string) => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
	const [cart, setCart] = useState<CartState>(() => {
		// Synchronous hydration from localStorage
		if (typeof window === "undefined") return {};
		return getFromLocalStorage<CartState>("cart") || {};
	});

	// Save to localStorage whenever cart changes
	useEffect(() => {
		addToLocalStorage({ key: "cart", value: cart });
	}, [cart]);

	const addItem = useCallback((slug: string) => {
		setCart((prev) => ({
			...prev,
			[slug]: (prev[slug] ?? 0) + 1,
		}));
	}, []);

	const increase = useCallback((slug: string) => {
		setCart((prev) => ({
			...prev,
			[slug]: (prev[slug] ?? 0) + 1,
		}));
	}, []);

	const decrease = useCallback((slug: string) => {
		setCart((prev) => {
			const qty = prev[slug];
			if (!qty) return prev;

			if (qty > 1) {
				return { ...prev, [slug]: qty - 1 };
			} else {
				const newCart = { ...prev };
				delete newCart[slug];
				return newCart;
			}
		});
	}, []);

	const remove = useCallback((slug: string) => {
		setCart((prev) => {
			const newCart = { ...prev };
			delete newCart[slug];
			return newCart;
		});
	}, []);

	const totalCount = useMemo(
		() => Object.values(cart).reduce((sum, qty) => sum + qty, 0),
		[cart],
	);

	const value = useMemo(
		() => ({ cart, totalCount, addItem, increase, decrease, remove }),
		[cart, totalCount, addItem, increase, decrease, remove],
	);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
	const ctx = useContext(CartContext);
	if (!ctx) {
		throw new Error("useCart must be used inside CartProvider");
	}
	return ctx;
}

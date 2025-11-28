import type { Product } from "../types/product";

interface ApiResult<T> {
	success: boolean;
	data: T;
	message?: string;
}

const BASE_URL = "/api/products";

export const productsApi = {
	async getAll(): Promise<ApiResult<Product[]>> {
		const res = await fetch(BASE_URL, { method: "GET" });

		if (!res.ok) {
			return { success: false, data: [], message: "Failed to load products" };
		}

		return res.json();
	},

	async search(query: string): Promise<ApiResult<Product[]>> {
		const url = `/api/search?q=${encodeURIComponent(query)}`;

		const res = await fetch(url, { method: "GET" });

		if (!res.ok) {
			return { success: false, data: [], message: "Search failed" };
		}

		const json = await res.json();
		return {
			success: json.success,
			data: json.data.products,
			message: json.error || undefined
		};
	},

	async getOne(slug: string): Promise<ApiResult<Product>> {
		const url = `${BASE_URL}/${slug}`;

		const res = await fetch(url, { method: "GET" });

		if (!res.ok) {
			return {
				success: false,
				data: {} as Product,
				message: "Failed to load product",
			};
		}

		return res.json();
	},
};

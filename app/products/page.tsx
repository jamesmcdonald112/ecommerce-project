"use client";

import EmptyProductList from "../features/products/components/EmptyProductList";
import ProductsGrid from "../features/products/components/ProductsGrid";
import SearchBar from "../features/products/components/SearchBar";
import { useProducts } from "../features/products/hooks/use-products";

export default function ProductsPage() {
	const { products, search, setSearch, runSearch, hasProducts, loading } =
		useProducts();

	return (
		<div className="min-h-screen bg-background">
			<div className="flex justify-center mb-6">
				<SearchBar value={search} onChange={setSearch} onSearch={runSearch} />
			</div>

			{loading ? (
				<div className="text-center text-sm text-muted-foreground">
					Loading...
				</div>
			) : !hasProducts ? (
				<EmptyProductList />
			) : (
				<ProductsGrid products={products} />
			)}
		</div>
	);
}

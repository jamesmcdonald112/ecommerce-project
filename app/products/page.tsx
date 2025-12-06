"use client";

import EmptyProductList from "../features/products/components/EmptyProductList";
import ProductsGrid from "../features/products/components/ProductsGrid";
import SearchBar from "../features/products/components/SearchBar";
import { useProducts } from "../features/products/hooks/use-products";

export default function ProductsPage() {
	const {
		products,
		search,
		setSearch,
		runSearch,
		hasProducts,
		loading,
		hasSearched,
	} = useProducts();

	return (
		<div className="bg-background">
			<div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:max-w-7xl lg:px-8">
				<div className="flex justify-center mb-8">
					<SearchBar
						value={search}
						onChange={setSearch}
						onSearch={runSearch}
						placeholder='Try "Phone with good camera"'
					/>
				</div>

				{loading && <LoadingState />}

				{!loading && !hasProducts && (
					<EmptyOrNoResults search={search} hasSearched={hasSearched} />
				)}

				{!loading && hasProducts && (
					<div className="bg-background">
						<h2 className="sr-only">Products</h2>
						<ResultsHeader search={search} hasSearched={hasSearched} />
						<ProductsGrid products={products} />
					</div>
				)}
			</div>
		</div>
	);
}

/* ------------------ UI helpers ------------------ */

function LoadingState() {
	return (
		<div className="text-center text-sm text-muted-foreground">Searching…</div>
	);
}

function EmptyOrNoResults({
	search,
	hasSearched,
}: {
	search: string;
	hasSearched: boolean;
}) {
	if (!hasSearched || !search.trim()) {
		return <EmptyProductList />;
	}

	return (
		<div className="text-center text-sm text-muted-foreground">
			No products found for "{search}". Try a different description.
		</div>
	);
}

function ResultsHeader({
	search,
	hasSearched,
}: {
	search: string;
	hasSearched: boolean;
}) {
	if (!hasSearched || !search.trim()) return null;

	return (
		<div className="mb-4 text-sm text-muted-foreground text-center">
			Results for &quot;{search}&quot;
		</div>
	);
}

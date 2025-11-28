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
		<div className="min-h-screen bg-background">
			<div className="flex justify-center mb-6">
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
				<>
					<ResultsHeader search={search} hasSearched={hasSearched} />
					<ProductsGrid products={products} />
				</>
			)}
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

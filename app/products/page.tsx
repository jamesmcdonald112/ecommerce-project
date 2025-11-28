"use client";

import EmptyProductList from "../features/products/components/EmptyProductList";
import ProductsGrid from "../features/products/components/ProductsGrid";
import SearchBar from "../features/products/components/SearchBar";
import { useProducts } from "../features/products/hooks/use-products";

// ------------------ Extracted UI helpers ------------------

function LoadingState() {
  return (
    <div className="text-center text-sm text-muted-foreground">
      Searching…
    </div>
  );
}

function EmptyOrNoResults({ search }: { search: string }) {
  return (
    <div className="text-center text-sm text-muted-foreground">
      {search.trim() ? (
        <>No products found for &quot;{search}&quot;. Try a different description.</>
      ) : (
        <EmptyProductList />
      )}
    </div>
  );
}

function ResultsHeader({ search }: { search: string }) {
  if (!search.trim()) return null;

  return (
    <div className="mb-4 text-sm text-muted-foreground text-center">
      Results for &quot;{search}&quot;
    </div>
  );
}

// ------------------ Main page ------------------

export default function ProductsPage() {
  const { products, search, setSearch, runSearch, hasProducts, loading, hasSearched } =
    useProducts();

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

      {loading ? (
        <LoadingState />
      ) : !hasProducts ? (
        hasSearched ? (
          <div className="text-center text-sm text-muted-foreground">
            No products found for "{search}". Try a different description.
          </div>
        ) : (
          <EmptyProductList />
        )
      ) : (
        <>
          {hasSearched && search.trim() && <ResultsHeader search={search} />}
          <ProductsGrid products={products} />
        </>
      )}
    </div>
  );
}
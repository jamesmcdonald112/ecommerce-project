"use client";

import { useCallback, useEffect, useState } from "react";
import type { Product } from "../schemas/product.schema";
import { productsApi } from "../services/products-api";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const hasProducts = products.length > 0;

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const result = await productsApi.getAll();
      if (result.success) setProducts(result.data);
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setHasSearched(false);
      setLoading(false);
    }
  }, []);

  const runSearch = useCallback(async () => {
    if (!search.trim()) {
      // empty search -> reload full list
      return loadAll();
    }

    setLoading(true);
    setHasSearched(true);
    try {
      const result = await productsApi.search(search);
      if (result.success) setProducts(result.data);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  }, [search, loadAll]);

  // initial fetch
  useEffect(() => {
    loadAll();
  }, [loadAll]);

  return {
    products,
    search,
    setSearch,
    runSearch,
    hasProducts,
    loading,
    hasSearched,
  };
}

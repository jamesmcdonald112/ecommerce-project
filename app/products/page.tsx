import type { Product } from "../features/products/schemas/product.schema";
import EmptyProductList from "./components/EmptyProductList";

export default function ProductsPage() {
	const products: Product[] = [
		{
			specs: {},
			reviews: [],
			title: "Test Product",
			shortDescription: "Short description",
			longDescription: "Longer description of the product.",
			price: 19.99,
			images: ["https://example.com/img.png"],
			slug: "test-product",
		},
	];

	return <div>{products.length === 0 && <EmptyProductList />}</div>;
}

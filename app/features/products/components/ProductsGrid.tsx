import type { Product } from "@/app/features/products/schemas/product.schema";
import ProductCard from "./ProductCard";

interface ProductsGridProps {
	products: Product[];
}

export default function ProductsGrid({ products }: ProductsGridProps) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{products.map((product) => (
				<ProductCard
					key={product.slug}
					title={product.title}
					image={product.images[0]}
					price={product.price}
					shortDescription={product.shortDescription}
					slug={product.slug}
				/>
			))}
		</div>
	);
}

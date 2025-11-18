import type { Product } from "../features/products/schemas/product.schema";
import EmptyProductList from "./components/EmptyProductList";
import ProductCard from "./components/ProductCard";

export default function ProductsPage() {
	const dummyProducts: Product[] = [
		{
			title: "Noise-Cancelling Wireless Headphones",
			shortDescription:
				"Premium over-ear sound with active noise cancellation.",
			longDescription:
				"Experience immersive audio with these high-fidelity wireless headphones. Includes ANC, 30-hour battery, USB-C fast charging, memory-foam cushions, and Bluetooth 5.3.",
			price: 199.99,
			slug: "wireless-noise-cancelling-headphones",
			images: [
				"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
			],
			specs: {
				Brand: "AudioCore",
				Battery: "30 hours",
				Connectivity: "Bluetooth 5.3",
				Weight: "250g",
				Warranty: "2 years",
			},
			reviews: ["Amazing clarity!", "Battery lasts forever."],
		},
	];

	const hasProducts = dummyProducts.length > 0;

	return (
		<div className="min-h-screen bg-background">
			{/* EMPTY PRODUCTS */}
			{!hasProducts && <EmptyProductList />}

			{/* Products Grid */}
			{hasProducts && (
				<div className="container mx-auto px-4 py-12">
					<h1 className="text-3xl font-bold mb-8">Products</h1>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{dummyProducts.map(
							({ title, images, price, shortDescription, slug }) => (
								<ProductCard
									key={slug}
									title={title}
									image={images[0]}
									price={price}
									shortDescription={shortDescription}
									slug={slug}
								/>
							),
						)}
					</div>
				</div>
			)}
		</div>
	);
}

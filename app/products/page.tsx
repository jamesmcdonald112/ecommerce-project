import type { Product } from "../features/products/schemas/product.schema";
import EmptyProductList from "./components/EmptyProductList";
import ProductsGrid from "./components/ProductsGrid";

export default function ProductsPage() {
	const dummyProducts: Product[] = [
		{
			title: "Wireless Studio Headphones",
			shortDescription:
				"High-fidelity closed-back design for deep focused listening.",
			longDescription:
				"These wireless studio headphones deliver wide dynamic range, soft memory-foam pads, and a neutral response perfect for editing, mixing, and daily listening.",
			price: 179.99,
			slug: "wireless-studio-headphones",
			images: [
				"https://images.unsplash.com/photo-1585298723682-7115561c51b7?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0",
			],
			specs: {
				Brand: "SoundCore",
				Battery: "35 hours",
				Connectivity: "Bluetooth 5.3",
				Weight: "240g",
			},
			reviews: [
				"Absolutely amazing clarity!",
				"Very comfortable for long sessions.",
			],
		},

		{
			title: "Vintage Wood Headphones",
			shortDescription: "Retro sound with handcrafted wooden ear cups.",
			longDescription:
				"Handmade wooden cups paired with modern drivers give these headphones a warm analog feel. Ideal for audiophiles seeking natural resonance.",
			price: 129.99,
			slug: "vintage-wood-headphones",
			images: [
				"https://images.unsplash.com/photo-1577174881658-0f30ed549adc?q=80&w=1320&auto=format&fit=crop&ixlib=rb-4.1.0",
			],
			specs: {
				Brand: "RetroTune",
				Material: "Walnut Wood",
				Cable: "1.8m braided",
				Weight: "280g",
			},
			reviews: ["Love the retro look!", "Warm and smooth sound."],
		},

		{
			title: "Travel-Ready Foldable Headphones",
			shortDescription: "Compact, lightweight, and perfect for everyday carry.",
			longDescription:
				"These portable headphones fold into a compact shape, offer passive noise isolation, and deliver crisp audio for on-the-go listening.",
			price: 69.99,
			slug: "travel-foldable-headphones",
			images: [
				"https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0",
			],
			specs: {
				Brand: "UrbanSound",
				Battery: "20 hours",
				Connectivity: "Bluetooth 5.0",
				Foldable: "Yes",
			},
			reviews: ["Super portable!", "Perfect for my commute."],
		},

		{
			title: "Modern Work-From-Home Headset",
			shortDescription: "Crystal-clear microphone with long-wear comfort.",
			longDescription:
				"Ideal for calls, meetings, conferences, and extended remote work. Features noise-filtering mic and soft breathable ear cushions.",
			price: 89.99,
			slug: "modern-office-headset",
			images: [
				"https://images.unsplash.com/photo-1583305727488-61f82c7eae4b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0",
			],
			specs: {
				Brand: "WorkPro",
				Microphone: "Noise-filtering",
				Battery: "40 hours",
				Connectivity: "Bluetooth 5.2",
			},
			reviews: ["Mic quality is fantastic.", "Use it daily for work."],
		},

		{
			title: "Premium White Wireless Headphones",
			shortDescription: "Elegant minimalist design with powerful sound.",
			longDescription:
				"A premium pair of white wireless headphones delivering punchy bass, great battery life, and a modern minimalist aesthetic.",
			price: 219.99,
			slug: "premium-white-wireless-headphones",
			images: [
				"https://images.unsplash.com/photo-1628116709703-c1c9ad550d36?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0",
			],
			specs: {
				Brand: "LumaAudio",
				Battery: "28 hours",
				Connectivity: "Bluetooth 5.3",
				Weight: "230g",
			},
			reviews: ["Beautiful design!", "Bass is insane."],
		},
	];

	const hasProducts = dummyProducts.length > 0;

	return (
		<div className="min-h-screen bg-background">
			{/* EMPTY PRODUCTS */}
			{!hasProducts && <EmptyProductList />}

			{/* Products Grid */}
			{hasProducts && <ProductsGrid products={dummyProducts} />}
		</div>
	);
}

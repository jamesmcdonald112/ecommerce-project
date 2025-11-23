import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AddToCartButton from "../../cart/components/AddToCartButton";
import type { Product } from "../schemas/product.schema";

interface ProductPageLayoutProps {
	product: Product;
}

export default function ProductPageLayout({ product }: ProductPageLayoutProps) {
	const {
		title,
		shortDescription,
		longDescription,
		specs,
		reviews,
		price,
		images,
	} = product;

	return (
		<div className="container mx-auto py-10 px-4">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
				{/* LEFT: IMAGE SECTION */}
				<div className="flex flex-col gap-4">
					<div className="relative w-full aspect-square bg-muted rounded-lg overflow-hidden">
						<Image
							width={400}
							height={400}
							src={images[0]}
							alt={title}
							className="object-cover w-full h-full rounded-lg"
						/>
					</div>

					{images.length > 1 && (
						<div className="grid grid-cols-4 gap-2">
							{images.map((img, i) => (
								<div
									key={img}
									className="relative aspect-square bg-muted rounded-md overflow-hidden"
								>
									<Image
										src={img}
										alt={`${title}-thumb-${i}`}
										className="object-cover w-full h-full"
									/>
								</div>
							))}
						</div>
					)}
				</div>

				{/* RIGHT: TEXT + DETAILS */}
				<div className="flex flex-col gap-6">
					<div>
						{/* TITLE */}
						<h1 className="text-3xl font-bold mb-2">{title}</h1>
						{/* SHORT DESCRIPTION */}
						<p className="text-muted-foreground">{shortDescription}</p>
					</div>

					{/* LONG DESCRIPTION */}
					<p className="leading-relaxed whitespace-pre-line">
						{longDescription}
					</p>

					{/* PRICE */}
					<div className="text-2xl font-semibold">€{price.toFixed(2)}</div>

					{/* SPECS */}
					{specs && Object.keys(specs).length > 0 && (
						<div>
							<h2 className="text-xl font-semibold mb-3">Specifications</h2>
							<ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
								{Object.entries(specs).map(([key, value]) => (
									<li key={key} className="border p-3 rounded-md">
										<span className="font-semibold">{key}: </span>
										<span>{value}</span>
									</li>
								))}
							</ul>
						</div>
					)}

					{/* REVIEWS */}
					{reviews && reviews.length > 0 && (
						<div>
							<h2 className="text-xl font-semibold mb-3">Reviews</h2>
							<ul className="space-y-2">
								{reviews.map((review) => (
									<li key={review} className="border p-3 rounded-md">
										"{review}"
									</li>
								))}
							</ul>
						</div>
					)}

					{/* ACTION BUTTONS */}
					<div className="flex flex-col gap-4 mt-4 md:flex-row">
						<AddToCartButton product={product} />
						<Button
							variant="outline"
							size="lg"
							className="w-full px-6 py-2 rounded-md border hover:bg-accent transition md:flex-1"
						>
							<Link href="/products">Back to Catalogue</Link>
						</Button>
					</div>

					{/* AI / Q&A Placeholder */}
					<div className="mt-10 p-6 border rounded-lg bg-muted">
						<p className="text-muted-foreground text-sm">
							This area will contain an AI‑powered Q&A assistant that can answer
							questions about the product using RAG and semantic search.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

"use client";

import Link from "next/link";
import type { ProductWithId } from "@/app/types/product";
import { Button } from "@/components/ui/button";
import AddToCartButton from "../../cart/components/AddToCartButton";

import { ProductQnA } from "../qna/components/ProductQna";
import { ProductImageGallery } from "./ProductImageGallery";

interface ProductPageLayoutProps {
	product: ProductWithId;
}

export default function ProductPageLayout({ product }: ProductPageLayoutProps) {
	const {
		title,
		shortDescription,
		longDescription,
		price,
		images,
		reviews,
		specs,
	} = product;

	const reviewCount = reviews?.length ?? 0;

	return (
		<div className="bg-background text-foreground">
			<div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
				<div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
					<ProductImageGallery images={images} title={title} />

					{/* PRODUCT INFO */}
					<div className="mt-10 px-0 sm:mt-16 sm:px-0 lg:mt-0">
						<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
							{title}
						</h1>

						<div className="mt-3">
							<h2 className="sr-only">Product information</h2>
							<p className="text-2xl font-semibold tracking-tight sm:text-3xl">
								€{price.toFixed(2)}
							</p>
						</div>

						{/* Reviews (simple star display placeholder) */}
						<div className="mt-3">
							<div className="flex items-center">
								<div className="flex items-center">
									{["one", "two", "three", "four", "five"].map((key, idx) => (
										<svg
											key={`star-${key}`}
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
											className={`h-5 w-5 ${idx < 4 ? "text-primary" : "text-muted-foreground"}`}
										>
											<title>Star rating icon</title>
											<path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" />
										</svg>
									))}
								</div>
								<p className="ml-2 text-sm text-muted-foreground">
									{reviewCount > 0
										? `${reviewCount} review${reviewCount > 1 ? "s" : ""}`
										: "No reviews yet"}
								</p>
							</div>
						</div>

						{/* Short & Long Description */}
						<div className="mt-6 space-y-4 text-base text-muted-foreground">
							<p>{shortDescription}</p>
							<p className="whitespace-pre-line">{longDescription}</p>
						</div>

						{/* Simple options / actions */}
						<div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
							<div className="w-full">
								<AddToCartButton product={product} />
							</div>
							<Button variant="outline" className="h-full w-full" asChild>
								<Link href="/products">Back to catalogue</Link>
							</Button>
						</div>

						{/* Additional details accordion-style */}
						<section
							aria-labelledby="details-heading"
							className="mt-10 border-t border-border"
						>
							<h2 id="details-heading" className="sr-only">
								Additional details
							</h2>

							<div className="divide-y divide-border">
								{/* Specs */}
								{specs && Object.keys(specs).length > 0 && (
									<details className="group open:bg-muted/30">
										<summary className="flex cursor-pointer items-center justify-between py-4 text-left text-sm font-medium transition hover:bg-muted/20">
											<span>Specifications</span>
											<span className="ml-4 flex items-center text-muted-foreground">
												<svg
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="1.5"
													className="h-5 w-5 group-open:hidden"
												>
													<title>Expand details</title>
													<path
														d="M12 4.5v15m7.5-7.5h-15"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
												<svg
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="1.5"
													className="hidden h-5 w-5 group-open:block"
												>
													<title>Collapse details</title>
													<path
														d="M5 12h14"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</span>
										</summary>
										<div className="pb-4">
											<ul className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
												{Object.entries(specs).map(([key, value]) => (
													<li
														key={key}
														className="rounded-md border border-border bg-background p-3"
													>
														<span className="font-semibold">{key}: </span>
														<span>{value}</span>
													</li>
												))}
											</ul>
										</div>
									</details>
								)}

								{/* Reviews */}
								{reviewCount > 0 && (
									<details className="group">
										<summary className="flex cursor-pointer items-center justify-between py-4 text-left text-sm font-medium transition hover:bg-muted/20">
											<span>Reviews</span>
											<span className="ml-4 flex items-center text-muted-foreground">
												<svg
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="1.5"
													className="h-5 w-5 group-open:hidden"
												>
													<title>Expand details</title>
													<path
														d="M12 4.5v15m7.5-7.5h-15"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
												<svg
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="1.5"
													className="hidden h-5 w-5 group-open:block"
												>
													<title>Collapse details</title>
													<path
														d="M5 12h14"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</span>
										</summary>
										<div className="pb-4 space-y-3 text-sm text-muted-foreground">
											{reviews?.map((review, idx) => (
												<p
													key={`${idx}-${review}`}
													className="rounded-md border border-border bg-background p-3"
												>
													{review}
												</p>
											))}
										</div>
									</details>
								)}
							</div>
						</section>

						{product._id && (
							<div className="mt-8">
								<ProductQnA productId={product._id.toString()} />
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

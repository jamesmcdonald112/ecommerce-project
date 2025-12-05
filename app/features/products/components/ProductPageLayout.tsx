"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { ProductWithId } from "@/app/types/product";
import { Button } from "@/components/ui/button";
import AddToCartButton from "../../cart/components/AddToCartButton";
import { ProductQnA } from "../qna/components/ProductQna";

interface ProductPageLayoutProps {
	product: ProductWithId;
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

	const galleryImages = useMemo(
		() => (images && images.length > 0 ? images : ["/placeholder.png"]),
		[images],
	);
	const [activeImage, setActiveImage] = useState(0);
	const reviewCount = reviews?.length ?? 0;
	const starRating = reviewCount > 0 ? 4 : 0; // simple placeholder rating when reviews exist
	const hasSpecs = specs && Object.keys(specs).length > 0;

	return (
		<div className="bg-background text-foreground">
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12 lg:px-8">
				{/* LEFT COLUMN: DETAILS + ACCORDIONS */}
				<div className="flex flex-col gap-8 lg:max-w-2xl">
					<nav aria-label="Breadcrumb">
						<ol className="flex items-center space-x-2 text-xs uppercase tracking-wide text-muted-foreground">
							<li>
								<div className="flex items-center">
									<Link
										href="/products"
										className="font-medium text-muted-foreground transition hover:text-foreground"
									>
										Products
									</Link>
									<span className="ml-2 text-muted-foreground">/</span>
								</div>
							</li>
							<li className="font-semibold text-foreground">{title}</li>
						</ol>
					</nav>

					<div className="space-y-4">
						<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
							{title}
						</h1>

						<section aria-labelledby="information-heading" className="space-y-4">
							<h2 id="information-heading" className="sr-only">
								Product information
							</h2>

							<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
								<p className="text-lg font-semibold sm:text-xl">
									€{price.toFixed(2)}
								</p>

								{reviewCount > 0 && (
									<div className="flex items-center gap-3 rounded-full border border-border px-4 py-2">
										<div className="flex items-center">
											{Array.from({ length: 5 }).map((_, i) => (
												<svg
													key={i}
													viewBox="0 0 20 20"
													fill="currentColor"
													aria-hidden="true"
													className={`h-5 w-5 ${
														i < starRating
															? "text-yellow-400"
															: "text-muted-foreground"
													}`}
												>
													<path
														fillRule="evenodd"
														clipRule="evenodd"
														d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
													/>
												</svg>
											))}
										</div>
										<p className="text-sm text-muted-foreground">
											{reviewCount} review{reviewCount === 1 ? "" : "s"}
										</p>
									</div>
								)}
							</div>

							<p className="text-base text-muted-foreground">{shortDescription}</p>
						</section>

						<div className="space-y-3 rounded-xl bg-muted/40 p-4 text-sm leading-relaxed">
							<p className="whitespace-pre-line">{longDescription}</p>
						</div>

						<div className="flex items-center text-sm">
							<svg
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
								className="h-5 w-5 text-green-500"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
								/>
							</svg>
							<span className="ml-2 text-muted-foreground">
								In stock and ready to ship
							</span>
						</div>
					</div>
					<section aria-labelledby="options-heading" className="space-y-5">
						<h2 id="options-heading" className="sr-only">
							Product options
						</h2>

						<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
							<div className="flex-1">
								<span className="block text-sm font-medium text-muted-foreground">
									Purchase options
								</span>
								<span className="text-xs text-muted-foreground">
									Add to cart or browse the catalogue.
								</span>
							</div>
						</div>

						<div className="flex flex-col gap-3">
							<AddToCartButton product={product} />
							<Button variant="outline" asChild className="w-full">
								<Link href="/products">Back to catalogue</Link>
							</Button>
							<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.5"
									aria-hidden="true"
									className="h-5 w-5"
								>
									<path
										d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
								<span>Lifetime guarantee & shipping details</span>
							</div>
						</div>
					</section>

					<section
						aria-labelledby="details-heading"
						className="divide-y divide-border rounded-xl border border-border bg-card"
					>
						<h2 id="details-heading" className="sr-only">
							Additional details
						</h2>

						{hasSpecs && (
							<details className="group open:bg-muted/30">
								<summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-left text-sm font-medium transition hover:bg-muted/30">
									<span className="text-muted-foreground group-open:text-foreground">
										Specifications
									</span>
									<span className="ml-4 flex items-center text-muted-foreground">
										{/*
											Fake toggle icons for summary
										*/}
										<svg
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="1.5"
											aria-hidden="true"
											className="h-5 w-5 group-open:hidden"
										>
											<path d="M12 4.5v15m7.5-7.5h-15" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
										<svg
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="1.5"
											aria-hidden="true"
											className="hidden h-5 w-5 group-open:block"
										>
											<path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
									</span>
								</summary>
								<div className="px-5 pb-5">
									<ul className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
										{Object.entries(specs!).map(([key, value]) => (
											<li
												key={key}
												className="rounded-lg border border-border bg-background p-3"
											>
												<span className="font-semibold">{key}: </span>
												<span className="text-muted-foreground">{value}</span>
											</li>
										))}
									</ul>
								</div>
							</details>
						)}

						<details className="group open:bg-muted/30">
							<summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-left text-sm font-medium transition hover:bg-muted/30">
								<span className="text-muted-foreground group-open:text-foreground">
									Reviews {reviewCount > 0 ? `(${reviewCount})` : ""}
								</span>
								<span className="ml-4 flex items-center text-muted-foreground">
									<svg
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.5"
										aria-hidden="true"
										className="h-5 w-5 group-open:hidden"
									>
										<path d="M12 4.5v15m7.5-7.5h-15" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
									<svg
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.5"
										aria-hidden="true"
										className="hidden h-5 w-5 group-open:block"
									>
										<path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</span>
							</summary>

							<div className="px-5 pb-5">
								{reviewCount > 0 ? (
									<div className="space-y-3">
										{(reviews ?? []).map((review, index) => (
											<div
												key={`${index}-${review}`}
												className="rounded-lg border border-border bg-background p-3 text-sm leading-relaxed"
											>
												&ldquo;{review}&rdquo;
											</div>
										))}
									</div>
								) : (
									<p className="text-sm text-muted-foreground">
										No reviews yet. Be the first to share your thoughts.
									</p>
								)}
							</div>
						</details>
					</section>
				</div>

				{/* RIGHT COLUMN: IMAGE + Q&A */}
				<div className="mt-10 flex flex-col gap-6 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:h-full lg:justify-between">
					<div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted shadow-sm">
						<Image
							fill
							sizes="(min-width: 1024px) 50vw, 100vw"
							src={galleryImages[activeImage]}
							alt={`${title} image ${activeImage + 1}`}
							className="h-full w-full object-cover"
							priority
						/>
					</div>

					{galleryImages.length > 1 && (
						<div className="grid grid-cols-4 gap-3">
							{galleryImages.map((img, index) => (
								<button
									type="button"
									key={img}
									onClick={() => setActiveImage(index)}
									className={`relative flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-background text-sm font-medium uppercase transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
										activeImage === index
											? "ring-2 ring-primary ring-offset-2"
											: "hover:bg-muted"
									}`}
									aria-label={`View image ${index + 1}`}
								>
									<span aria-hidden="true" className="absolute inset-0">
										<Image
											fill
											sizes="150px"
											src={img}
											alt={`${title} thumbnail ${index + 1}`}
											className="object-cover"
										/>
									</span>
								</button>
							))}
						</div>
					)}

					{/* AI / Q&A pinned to bottom of right column */}
					<div className="lg:mt-auto">
						{product._id && <ProductQnA productId={product._id.toString()} />}
					</div>
				</div>
			</div>
		</div>
	);
}

"use client";

import Image from "next/image";
import { useState } from "react";

type ProductImageGalleryProps = {
	images?: string[] | null;
	title: string;
};

export function ProductImageGallery({
	images,
	title,
}: ProductImageGalleryProps) {
	const galleryImages = images?.length ? images : ["/placeholder.svg"];
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<div className="flex flex-col-reverse">
			{galleryImages.length > 1 && (
				<div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
					<div className="grid grid-cols-4 gap-4">
						{galleryImages.map((src, idx) => (
							<button
								key={src}
								type="button"
								onClick={() => setActiveIndex(idx)}
								className={`relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-background text-sm font-medium uppercase transition hover:bg-muted  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
									activeIndex === idx
										? "ring-2 ring-primary ring-offset-2"
										: "ring-2 ring-transparent"
								}`}
								aria-label={`View image ${idx + 1}`}
							>
								<span
									aria-hidden
									className="absolute inset-0 overflow-hidden rounded-md"
								>
									<Image
										fill
										sizes="150px"
										src={src}
										alt={`${title} thumbnail ${idx + 1}`}
										className="object-cover"
									/>
								</span>
							</button>
						))}
					</div>
				</div>
			)}

			<div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted sm:rounded-xl">
				<Image
					fill
					sizes="(min-width: 1024px) 50vw, 100vw"
					src={galleryImages[activeIndex]}
					alt={title}
					className="h-full w-full object-cover"
					priority
				/>
			</div>
		</div>
	);
}

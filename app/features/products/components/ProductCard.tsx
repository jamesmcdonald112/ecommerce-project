import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
	title: string;
	image: string;
	price: number;
	shortDescription: string;
	slug: string;
}

export default function ProductCard({
	title,
	image,
	price,
	shortDescription,
	slug,
}: ProductCardProps) {
	return (
		<Link
			href={`/products/${slug}`}
			className="group block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
		>
			<div className="relative w-full overflow-hidden rounded-lg bg-muted transition group-hover:opacity-90 aspect-square xl:aspect-7/8">
				<Image
					fill
					src={image}
					alt={title}
					className="object-cover transition duration-300 group-hover:scale-105"
					sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
				/>
			</div>
			<h3 className="mt-4 text-sm text-foreground line-clamp-2">{title}</h3>
			<p className="mt-1 text-sm text-muted-foreground line-clamp-2">
				{shortDescription}
			</p>
			<p className="mt-1 text-lg font-medium text-foreground">
				€{price.toFixed(2)}
			</p>
		</Link>
	);
}

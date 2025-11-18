import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

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
		<Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">

      {/* IMAGE */}
			<div className="px-6">
				<div className="relative w-full aspect-square overflow-hidden bg-muted rounded-lg">
					<Image
						fill
						src={image}
						alt={title}
						className="object-cover hover:scale-105 transition-transform duration-300"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				</div>
			</div>

      {/* TEXT */}
			<CardHeader>
				<CardTitle className="line-clamp-2">{title}</CardTitle>
				<CardDescription className="line-clamp-2">
					{shortDescription}
				</CardDescription>
			</CardHeader>

      {/* FOOTER */}
			<CardFooter className="flex items-center justify-between pt-0">
				<span className="text-lg font-bold">€{price.toFixed(2)}</span>
				<Link href={`/products/${slug}`}>
					<Button variant="default">View</Button>
				</Link>
			</CardFooter>
		</Card>
	);
}

import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Product } from "../../products/schemas/product.schema";
import { useCart } from "../context/CartContext";
import DisplayProductSkeleton from "./DisplayProductSkeleton";

interface DisplayProductProps {
	slug: string;
	quantity: number;
	product?: Product;
}

export default function DisplayProduct({
	slug,
	quantity,
	product,
}: DisplayProductProps) {
	const { increase, decrease, remove } = useCart();

	if (!product) return <DisplayProductSkeleton />;

	const title = product.title;
	const price = product.price;
	const image = product.images[0];

	function ProductImage({ src, alt }: { src?: string; alt: string }) {
		return src ? (
			<Image
				width={64}
				height={64}
				src={src}
				alt={alt}
				className="w-16 h-16 object-cover rounded"
			/>
		) : (
			<div className="w-16 h-16 bg-gray-200 rounded" />
		);
	}

	return (
		<div className="grid grid-cols-[64px_1fr_auto] gap-4 p-4 border rounded-md md:grid-cols-[64px_1fr_auto_auto]">
			<ProductImage src={image} alt={title} />

			<div>
				<p className="font-semibold truncate">{title}</p>
				<p className="text-sm text-gray-600">Qty: {quantity}</p>
			</div>

			<div className="flex items-center justify-center gap-1">
				<Button size="sm" onClick={() => increase(slug)}>
					+
				</Button>
				<Button size="sm" onClick={() => decrease(slug)}>
					-
				</Button>
				<Button size="sm" variant="destructive" onClick={() => remove(slug)}>
					Remove
				</Button>
			</div>

			<div className="flex items-center justify-end">
				<p className="font-semibold whitespace-nowrap">
					€{(price * quantity).toFixed(2)}
				</p>
			</div>
		</div>
	);
}

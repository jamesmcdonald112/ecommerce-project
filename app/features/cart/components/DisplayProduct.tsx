import Image from "next/image";
import type { Product } from "../../products/schemas/product.schema";

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
	const title = product?.title ?? slug;
	const price = product?.price ?? 0;
	const image = product?.images?.[0];

	return (
    <div className="flex items-center justify-between gap-4 p-4 border rounded-md">
      <div className="flex items-center gap-4">
        {image && (
          <Image
            width={64}
            height={64}
            src={image}
            alt={title}
            className="w-16 h-16 object-cover rounded"
          />
        )}

        <div>
          <p className="font-semibold">{title}</p>
          <p>Qty: {quantity}</p>
        </div>
      </div>

      <p className="font-semibold">€{(price * quantity).toFixed(2)}</p>
    </div>
  );
}

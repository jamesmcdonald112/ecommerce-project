import { notFound } from "next/navigation";
import { getProductBySlug } from "@/app/features/products/api/getProductBySlug";
import { convertSpecsToSpecRows } from "@/app/features/products/lib/transform-spec-rows";
import type { Product } from "@/app/features/products/schemas/product.schema";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import ProductEditForm from "./components/product-edit-form";

interface EditProductPageProps {
	params: Promise<{ slug: string }>;
}

export default async function EditProductPage({
	params,
}: EditProductPageProps) {
	const { slug } = await params;

	const product = await getProductBySlug(slug);

	// 404 page
	if (!product) {
		notFound();
	}

	// Serialize the Mongoose document to a plain object
	// This is necessary because Mongoose documents contain non-serializable properties
	const productObj = product.toObject();

	// Convert the product data to form format
	// Convert specs object to specRows array
	const specRows = convertSpecsToSpecRows(productObj.specs || {});

	const formData: Product = {
		title: productObj.title,
		shortDescription: productObj.shortDescription,
		longDescription: productObj.longDescription,
		price: productObj.price,
		slug: productObj.slug,
		specs:
			productObj.specs instanceof Map
				? Object.fromEntries(productObj.specs)
				: productObj.specs || {},
		specRows, // converted above
		reviews: productObj.reviews || [],
		images: productObj.images || [],
	};

	return (
		<Card className="w-full sm:max-w-2xl">
			<CardHeader>
				<CardTitle>Edit Product</CardTitle>
				<CardDescription>
					Update the details of your product below.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ProductEditForm initialData={formData} slug={slug} />
			</CardContent>
		</Card>
	);
}

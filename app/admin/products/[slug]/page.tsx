import type { HydratedDocument } from "mongoose";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/app/features/products/api/getProductBySlug";
import type {
	Product,
	ProductFormData,
} from "@/app/features/products/schemas/product.schema";
import { mapToObject } from "@/app/features/products/utils/map-to-object";
import { convertSpecsToSpecRows } from "@/app/features/products/utils/transform-spec-rows";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import ProductEditForm from "../../../features/products/forms/product-edit-form";

interface EditProductPageProps {
	params: Promise<{ slug: string }>;
}

export default async function EditProductPage({
	params,
}: EditProductPageProps) {
	const { slug } = await params;

	const product: HydratedDocument<Product> | null =
		await getProductBySlug(slug);

	// 404 page
	if (!product) {
		notFound();
	}

	// Serialize the Mongoose document to a plain object
	// This is necessary because Mongoose documents contain non-serializable properties
	const productObj = product.toObject();

	// Mongoose Map - plain object (required for serialization and form fields)
	const rawSpecs = mapToObject<string>(productObj.specs);

	// Convert specs to form-friendly rows
	const specRows = convertSpecsToSpecRows(rawSpecs);

	const formData: ProductFormData = {
		title: productObj.title,
		shortDescription: productObj.shortDescription,
		longDescription: productObj.longDescription,
		price: productObj.price,
		slug: productObj.slug,
		specs: rawSpecs,
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

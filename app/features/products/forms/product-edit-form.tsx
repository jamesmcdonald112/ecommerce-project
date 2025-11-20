"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import LongDescriptionField from "@/app/features/products/components/fields/long-description-field";
import PriceField from "@/app/features/products/components/fields/price-field";
import ShortDescriptionField from "@/app/features/products/components/fields/short-description-field";
import SlugField from "@/app/features/products/components/fields/slug-field";
import TitleField from "@/app/features/products/components/fields/title-field";
import ImagesFieldArray from "@/app/features/products/components/form-fields/images-field-array";
import ReviewsFieldArray from "@/app/features/products/components/form-fields/reviews-field-array";
import SpecsFieldArray from "@/app/features/products/components/form-fields/specs-field-array";
import { useProductEditFormSubmit } from "@/app/features/products/hooks/useProductEditFormSubmit";
import {
	type ProductFormData,
	productFormSchema,
} from "@/app/features/products/schemas/product.schema";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";

interface ProductEditFormProps {
	initialData: ProductFormData;
	slug: string;
}

export default function ProductEditForm({
	initialData,
	slug,
}: ProductEditFormProps) {
	const form = useForm<ProductFormData>({
		resolver: zodResolver(productFormSchema),
		defaultValues: initialData,
	});

	const onSubmit = useProductEditFormSubmit(slug);

	return (
		<form onSubmit={form.handleSubmit(onSubmit)}>
			<FieldGroup>
				<TitleField form={form} />
				<ShortDescriptionField form={form} />
				<LongDescriptionField form={form} />
				<SpecsFieldArray form={form} />
				<ReviewsFieldArray form={form} />
				<PriceField form={form} />
				<ImagesFieldArray form={form} />
				<SlugField form={form} />
			</FieldGroup>

			<div className="flex gap-2 justify-end mt-6">
				<Button
					type="button"
					variant="outline"
					onClick={() => form.reset(initialData)}
				>
					Reset
				</Button>
				<Button type="submit">Update Product</Button>
			</div>
		</form>
	);
}

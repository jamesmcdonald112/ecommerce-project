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
import { useProductFormSubmit } from "@/app/features/products/hooks/useProductFormSubmit";
import {
	type ProductFormData,
	productFormSchema,
} from "@/app/features/products/schemas/product.schema";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";

export default function ProductForm() {
	const form = useForm<ProductFormData>({
		resolver: zodResolver(productFormSchema),
		mode: "onBlur",
		defaultValues: {
			title: "",
			shortDescription: "",
			longDescription: "",
			specs: {},
			specRows: [],
			reviews: [],
			price: 0,
			images: [],
			slug: "",
		},
	});

	const onSubmit = useProductFormSubmit(form.reset);

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
				<Button type="button" variant="outline" onClick={() => form.reset()}>
					Reset
				</Button>
				<Button type="submit">Submit</Button>
			</div>
		</form>
	);
}

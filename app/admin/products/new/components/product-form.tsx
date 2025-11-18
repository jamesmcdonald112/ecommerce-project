"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import LongDescriptionField from "@/app/admin/products/components/fields/long-description-field";
import PriceField from "@/app/admin/products/components/fields/price-field";
import ShortDescriptionField from "@/app/admin/products/components/fields/short-description-field";
import SlugField from "@/app/admin/products/components/fields/slug-field";
import TitleField from "@/app/admin/products/components/fields/title-field";
import { useProductFormSubmit } from "@/app/admin/products/components/hooks/useProductFormSubmit";
import {
	type ProductFormData,
	productFormSchema,
} from "@/app/features/products/schemas/product.schema";
import ImagesFieldArray from "@/components/form-fields/images-field-array";
import ReviewsFieldArray from "@/components/form-fields/reviews-field-array";
import SpecsFieldArray from "@/components/form-fields/specs-field-array";
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

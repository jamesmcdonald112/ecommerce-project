"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
	type Product,
	productSchema,
} from "@/app/features/products/schemas/product.schema";
import ImagesFieldArray from "@/components/form-fields/images-field-array";
import ReviewsFieldArray from "@/components/form-fields/reviews-field-array";
import SpecsFieldArray from "@/components/form-fields/specs-field-array";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import LongDescriptionField from "./fields/long-description-field";
import PriceField from "./fields/price-field";
import ShortDescriptionField from "./fields/short-description-field";
import SlugField from "./fields/slug-field";
import TitleField from "./fields/title-field";
import { useProductFormSubmit } from "./hooks/useProductFormSubmit";

export default function ProductForm() {
	const form = useForm<Product>({
		resolver: zodResolver(productSchema),
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

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { productSchema } from "@/app/features/products/schemas/product.schema";
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

export default function ProductForm() {
	const form = useForm<z.infer<typeof productSchema>>({
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

	function onSubmit(formData: z.infer<typeof productSchema>): void {
		toast("You submitted the following values:", {
			description: (
				<pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
					<code>{JSON.stringify(formData, null, 2)}</code>
				</pre>
			),
			position: "bottom-right",
			classNames: {
				content: "flex flex-col gap-2",
			},
			style: {
				"--border-radius": "calc(var(--radius)  + 4px)",
			} as React.CSSProperties,
		});
	}

	return (
		<form id="form-new-product" onSubmit={form.handleSubmit(onSubmit)}>
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

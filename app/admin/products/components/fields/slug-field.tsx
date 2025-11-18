import { Controller, type UseFormReturn } from "react-hook-form";
import type { z } from "zod";

import type { productSchema } from "@/app/features/products/schemas/product.schema";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface SlugFieldProps {
	form: UseFormReturn<z.infer<typeof productSchema>>;
}

export default function SlugField({ form }: SlugFieldProps) {
	return (
		<Controller
			name="slug"
			control={form.control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel htmlFor="form-new-product-slug">Product Slug</FieldLabel>
					<Input
						{...field}
						id="form-new-product-slug"
						aria-invalid={fieldState.invalid}
						placeholder="running-shoes-mens"
						autoComplete="off"
					/>
					<FieldDescription>
						URL-friendly identifier for the product (lowercase, hyphens only).
					</FieldDescription>
					{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
				</Field>
			)}
		/>
	);
}

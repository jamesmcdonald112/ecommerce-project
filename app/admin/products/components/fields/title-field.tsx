import { Controller, type UseFormReturn } from "react-hook-form";
import type { z } from "zod";

import type { productSchema } from "@/app/features/products/schemas/product.schema";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface TitleFieldProps {
	form: UseFormReturn<z.infer<typeof productSchema>>;
}

export default function TitleField({ form }: TitleFieldProps) {
	return (
		<Controller
			name="title"
			control={form.control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel htmlFor="form-new-product-title">
						Product Title
					</FieldLabel>
					<Input
						{...field}
						id="form-new-product-title"
						aria-invalid={fieldState.invalid}
						placeholder="Running Shoes - Men's"
						autoComplete="off"
					/>
					{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
				</Field>
			)}
		/>
	);
}

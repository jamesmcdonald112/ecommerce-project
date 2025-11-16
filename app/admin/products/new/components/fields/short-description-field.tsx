import { Controller, type UseFormReturn } from "react-hook-form";
import type { z } from "zod";

import { PRODUCT_LIMITS } from "@/app/features/products/config/product-field-limits";
import type { productSchema } from "@/app/features/products/schemas/product.schema";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	InputGroupTextarea,
} from "@/components/ui/input-group";

interface ShortDescriptionFieldProps {
	form: UseFormReturn<z.infer<typeof productSchema>>;
}

export default function ShortDescriptionField({
	form,
}: ShortDescriptionFieldProps) {
	return (
		<Controller
			name="shortDescription"
			control={form.control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel htmlFor="form-new-product-short-description">
						Short Description
					</FieldLabel>
					<InputGroup>
						<InputGroupTextarea
							{...field}
							id="form-new-product-short-description"
							placeholder="Lightweight running shoes designed for daily training"
							rows={3}
							className="min-h-24 resize-none"
							aria-invalid={fieldState.invalid}
						/>
						<InputGroupAddon align="block-end">
							<InputGroupText className="tabular-nums">
								{field.value.length}/{PRODUCT_LIMITS.shortDescription}{" "}
								characters
							</InputGroupText>
						</InputGroupAddon>
					</InputGroup>
					<FieldDescription>
						Write a 1–2 sentence summary of the product.
					</FieldDescription>
					{fieldState.invalid && (
						<FieldError errors={[fieldState.error]} />
					)}
				</Field>
			)}
		/>
	);
}

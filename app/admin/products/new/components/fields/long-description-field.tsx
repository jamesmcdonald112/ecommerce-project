import { Controller, type UseFormReturn } from "react-hook-form";
import type { z } from "zod";

import { PRODUCT_LIMITS } from "@/app/features/products/config/product-field-limits";
import type { productSchema } from "@/app/features/products/schemas/product.schema";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	InputGroupTextarea,
} from "@/components/ui/input-group";

interface LongDescriptionFieldProps {
	form: UseFormReturn<z.infer<typeof productSchema>>;
}

export default function LongDescriptionField({
	form,
}: LongDescriptionFieldProps) {
	return (
		<Controller
			name="longDescription"
			control={form.control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel htmlFor="form-new-product-long-description">
						Long Description
					</FieldLabel>
					<InputGroup>
						<InputGroupTextarea
							{...field}
							id="form-new-product-long-description"
							placeholder="Lightweight running shoes designed for daily training"
							rows={6}
							className="min-h-24 resize-none"
							aria-invalid={fieldState.invalid}
						/>
						<InputGroupAddon align="block-end">
							<InputGroupText className="tabular-nums">
								{field.value.length}/{PRODUCT_LIMITS.longDescription} characters
							</InputGroupText>
						</InputGroupAddon>
					</InputGroup>
					<FieldDescription>
						Describe the product in detail: features, materials, sizing,
						performance, use cases, and anything a customer needs to make a
						decision.
					</FieldDescription>
					{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
				</Field>
			)}
		/>
	);
}

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

interface PriceFieldProps {
	form: UseFormReturn<z.infer<typeof productSchema>>;
}

export default function PriceField({ form }: PriceFieldProps) {
	return (
		<Controller
			name="price"
			control={form.control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel htmlFor="form-new-product-price">
						Product Price
					</FieldLabel>
					<div className="relative">
						<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
							€
						</span>
						<Input
							{...field}
							id="form-new-product-price"
							aria-invalid={fieldState.invalid}
							placeholder="70.00"
							autoComplete="off"
							type="number"
							step="0.01"
							min="0"
							onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
							value={field.value || ""}
							className="pl-7"
						/>
					</div>
					<FieldDescription>Enter the product price in EUR.</FieldDescription>
					{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
				</Field>
			)}
		/>
	);
}

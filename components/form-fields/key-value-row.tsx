import { Controller, type UseFormReturn } from "react-hook-form";
import type { z } from "zod";

import type { productSchema } from "@/app/features/products/schemas/product.schema";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface KeyValueRowProps {
	form: UseFormReturn<z.infer<typeof productSchema>>;
	index: number;
	onRemove: () => void;
}

export default function KeyValueRow({
	form,
	index,
	onRemove,
}: KeyValueRowProps) {
	return (
		<div className="flex gap-4 items-start">
			{/* KEY */}
			<Controller
				name={`specRows.${index}.key`}
				control={form.control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid} className="flex-1">
						<FieldLabel htmlFor={`spec-key-${index}`}>Key</FieldLabel>
						<Input
							{...field}
							id={`spec-key-${index}`}
							aria-invalid={fieldState.invalid}
							placeholder="Colour"
							autoComplete="off"
						/>
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>

			{/* VALUE */}
			<Controller
				name={`specRows.${index}.value`}
				control={form.control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid} className="flex-1">
						<FieldLabel htmlFor={`spec-value-${index}`}>Value</FieldLabel>
						<Input
							{...field}
							id={`spec-value-${index}`}
							aria-invalid={fieldState.invalid}
							placeholder="Blue"
							autoComplete="off"
						/>
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>

			{/* REMOVE BUTTON */}
			<Button type="button" variant="destructive" size="sm" onClick={onRemove}>
				Remove
			</Button>
		</div>
	);
}

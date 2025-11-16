import { type UseFormReturn, useFieldArray } from "react-hook-form";
import type { z } from "zod";
import type { productSchema } from "@/app/features/products/schemas/product.schema";
import KeyValueRow from "./key-value-row";
import { Button } from "./ui/button";

interface SpecsFieldArrayProps {
	form: UseFormReturn<z.infer<typeof productSchema>>;
}

export default function SpecsFieldArray({ form }: SpecsFieldArrayProps) {
	const { control } = form;

	const { fields, append, remove } = useFieldArray({
		control,
		name: "specRows",
	});

	return (
		<div className="space-y-4">
			{fields.map((field, index) => (
				<KeyValueRow
					key={field.id}
					form={form}
					index={index}
					onRemove={() => remove(index)}
				/>
			))}

			<Button
				type="button"
				variant="outline"
				size="sm"
				onClick={() => append({ key: "", value: "" })}
			>
				Add Specification
			</Button>
		</div>
	);
}

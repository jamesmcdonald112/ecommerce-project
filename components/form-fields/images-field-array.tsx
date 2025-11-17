import { Controller, type UseFormReturn, useFieldArray } from "react-hook-form";
import type { z } from "zod";

import type { productSchema } from "@/app/features/products/schemas/product.schema";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface ImagesFieldArrayProps {
	form: UseFormReturn<z.infer<typeof productSchema>>;
}

export default function ImagesFieldArray({ form }: ImagesFieldArrayProps) {
	const { control } = form;

	const { fields, append, remove } = useFieldArray({
		control: control as never,
		name: "images",
	});

	return (
		<div className="space-y-4">
			{fields.map((field, index) => (
				<div key={field.id} className="flex gap-4 items-start">
					{/* IMAGE URL */}
					<Controller
						name={`images.${index}`}
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid} className="flex-1">
								<FieldLabel htmlFor={`image-url-${index}`}>
									Image URL {index + 1}
								</FieldLabel>
								<Input
									{...field}
									id={`image-url-${index}`}
									placeholder="https://example.com/product.jpg"
									aria-invalid={fieldState.invalid}
									autoComplete="off"
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>

					{/* REMOVE BUTTON */}
					<Button
						type="button"
						variant="destructive"
						size="sm"
						onClick={() => remove(index)}
						className="mt-8"
					>
						Remove
					</Button>
				</div>
			))}

			<Button
				type="button"
				variant="outline"
				size="sm"
				onClick={() => append("")}
			>
				Add Image
			</Button>
		</div>
	);
}

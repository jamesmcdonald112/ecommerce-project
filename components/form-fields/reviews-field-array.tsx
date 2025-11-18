import { Controller, type UseFormReturn, useFieldArray } from "react-hook-form";
import type { z } from "zod";

import type { productFormSchema } from "@/app/features/products/schemas/product.schema";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

interface ReviewsFieldArrayProps {
	form: UseFormReturn<z.infer<typeof productFormSchema>>;
}

export default function ReviewsFieldArray({ form }: ReviewsFieldArrayProps) {
	const { control } = form;

	const { fields, append, remove } = useFieldArray({
		control: control as never,
		name: "reviews",
	});

	return (
		<div className="space-y-4">
			{fields.map((field, index) => (
				<div key={field.id} className="flex gap-4 items-start">
					{/* REVIEW TEXT */}
					<Controller
						name={`reviews.${index}`}
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid} className="flex-1">
								<FieldLabel htmlFor={`review-${index}`}>
									Review {index + 1}
								</FieldLabel>
								<Textarea
									{...field}
									id={`review-${index}`}
									placeholder="Excellent product, very durable and comfortable..."
									rows={3}
									className="resize-none"
									aria-invalid={fieldState.invalid}
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
				Add Review
			</Button>
		</div>
	);
}

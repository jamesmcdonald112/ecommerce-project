"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { PRODUCT_LIMITS } from "@/app/features/products/config/product-field-limits";
import { productSchema } from "@/app/features/products/schemas/product.schema";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	InputGroupTextarea,
} from "@/components/ui/input-group";
import SpecsFieldArray from "@/components/specs-filed-array";

export default function BugReportForm() {
	const form = useForm<z.infer<typeof productSchema>>({
		resolver: zodResolver(productSchema),
		mode: "onBlur", // Runs validation when the field loses focus (shows min/max errors as you leave the input)
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
		<Card className="w-full sm:max-w-md">
			<CardHeader>
				<CardTitle>Create Product</CardTitle>
				<CardDescription>
					Enter the details of the product below.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form id="form-new-product" onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup>
						 {/* TITLE */}
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
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						{/* SHORT DESCRIPTION */}
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

						{/* LONG DESCRIPTION */}
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
												{field.value.length}/{PRODUCT_LIMITS.longDescription}{" "}
												characters
											</InputGroupText>
										</InputGroupAddon>
									</InputGroup>
									<FieldDescription>
										Describe the product in detail: features, materials, sizing,
										performance, use cases, and anything a customer needs to
										make a decision.
									</FieldDescription>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						{/* SPECS */}
						<SpecsFieldArray form={form}/>
					</FieldGroup>
				</form>
			</CardContent>
			<CardFooter>
				<Field orientation="horizontal">
					<Button type="button" variant="outline" onClick={() => form.reset()}>
						Reset
					</Button>
					<Button type="submit" form="form-new-product">
						Submit
					</Button>
				</Field>
			</CardFooter>
		</Card>
	);
}

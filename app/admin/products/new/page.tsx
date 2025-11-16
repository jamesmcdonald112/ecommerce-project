import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import ProductForm from "./components/product-form";

export default function CreateProductPage() {
	return (
		<Card className="w-full sm:max-w-2xl">
			<CardHeader>
				<CardTitle>Create Product</CardTitle>
				<CardDescription>
					Enter the details of the product below.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ProductForm />
			</CardContent>
		</Card>
	);
}

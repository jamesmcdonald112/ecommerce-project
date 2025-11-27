import type { Product } from "../../products/schemas/product.schema";

export function buildProductText(product: Product): string {
	const { title, shortDescription, longDescription, specs, reviews } = product;

	let text = "";

	if (title) text += `Product: ${title}\n\n`;
	if (shortDescription) text += `Short description: ${shortDescription}\n\n`;
	if (longDescription) text += `Long description: ${longDescription}\n\n`;

	if (specs && Object.keys(specs).length > 0) {
		text += "Specifications:\n";
		for (const [key, value] of Object.entries(specs)) {
			text += `${key}: ${value}. `;
		}
		text += "\n\n";
	}

	if (reviews && reviews.length > 0) {
		text += "Reviews:\n";
		for (const review of reviews) {
			text += `Review: ${review}\n`;
		}
		text += "\n";
	}

	return text.trim();
}

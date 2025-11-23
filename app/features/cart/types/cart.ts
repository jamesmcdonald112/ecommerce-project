import type { Product } from "../../products/schemas/product.schema";

export type CartItem = {
	product: Product;
	quantity: number;
};

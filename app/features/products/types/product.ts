import type { Product as SchemaProduct } from "../schemas/product.schema";

// Re-export Product so the rest of the app can import from here
export type Product = SchemaProduct;

import type { Product } from "../../products/schemas/product.schema";

export type ProductWithId = Product & { _id: string };

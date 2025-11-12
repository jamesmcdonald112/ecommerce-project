export interface Product {
	title: string;
	shortDescription: string;
	longDescription: string;
	specs?: Record<string, string>;
	reviews?: string[];
	price: number;
	images: string[];
	slug: string;
}

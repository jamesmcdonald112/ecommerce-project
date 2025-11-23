export async function fetchCartProducts(slugs: string[]) {
	return Promise.all(
		slugs.map(async (slug) => {
			const res = await fetch(`/api/products/${slug}`);
			const json = await res.json();
			return json.data;
		}),
	);
}

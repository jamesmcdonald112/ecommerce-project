import Link from "next/link";

export default function HomePage() {
	return (
		<div className="bg-background px-6 py-16 text-foreground sm:py-24 lg:px-8">
			<div className="mx-auto flex max-w-4xl flex-col gap-16 text-base text-muted-foreground">
				<section className="space-y-4 text-center sm:text-left">
					<p className="text-sm font-semibold text-primary">Overview</p>
					<h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
						Technical Details
					</h1>
					<p className="text-lg text-muted-foreground">
						A demo e-commerce site with semantic product search and AI-powered
						Q&A on each product page. Built with Next.js, MongoDB, OpenAI
						embeddings, and RAG.
					</p>
					<div className="flex flex-wrap gap-3 pt-2">
						<Link
							href="/products"
							className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
						>
							Browse catalogue
						</Link>
						<Link
							href="/cart"
							className="rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-muted"
						>
							View cart
						</Link>
					</div>
				</section>

				<section className="space-y-4">
					<h2 className="text-3xl font-semibold tracking-tight text-foreground">
						What this project does
					</h2>
					<ul className="space-y-3">
						<li>
							<strong className="text-foreground">
								Catalogue (/products):
							</strong>{" "}
							Grid of products with natural language search.
						</li>
						<li>
							<strong className="text-foreground">
								Product detail (/products/[slug]):
							</strong>{" "}
							Images, price, specs, reviews, descriptions, add to cart, and an
							“Ask about this product” box.
						</li>
						<li>
							<strong className="text-foreground">Cart (/cart):</strong> View
							items, change quantity, remove items; totals update accordingly.
						</li>
						<li>
							<strong className="text-foreground">
								Admin (/admin/product, /admin/product/[slug]):
							</strong>{" "}
							Add and edit products (demo-only, not protected).
						</li>
					</ul>
				</section>

				<section className="space-y-4">
					<h2 className="text-3xl font-semibold tracking-tight text-foreground">
						How semantic search works
					</h2>
					<ol className="list-decimal space-y-2 pl-5">
						<li>
							Product data lives in MongoDB (title, descriptions, specs,
							reviews, price, images, slug).
						</li>
						<li>
							Each product is chunked; chunks are embedded with OpenAI
							text-embedding-3-* and stored as vectors.
						</li>
						<li>
							On search: query → embedding → vector search on product chunks →
							rank products by similarity.
						</li>
						<li>Top matches are returned to the /products page.</li>
					</ol>
				</section>

				<section className="space-y-4">
					<h2 className="text-3xl font-semibold tracking-tight text-foreground">
						How product Q&A (RAG) works
					</h2>
					<ul className="space-y-2">
						<li>
							Q&A widget posts{" "}
							<code className="text-foreground">productId</code> +{" "}
							<code className="text-foreground">question</code> to{" "}
							<code className="text-foreground">/api/products/ask</code>.
						</li>
						<li>
							Backend embeds the question, searches chunks filtered by
							productId, and builds a context.
						</li>
						<li>
							Calls OpenAI (e.g., gpt-4.1-mini) with a strict prompt: answer
							only from provided product info, no invented facts.
						</li>
						<li>
							Returns the answer to the UI. Responses are constrained to stored
							descriptions, specs, and reviews.
						</li>
					</ul>
				</section>

				<section className="space-y-4">
					<h2 className="text-3xl font-semibold tracking-tight text-foreground">
						Tech stack
					</h2>
					<div className="grid gap-4 sm:grid-cols-2">
						<div>
							<h3 className="text-lg font-semibold text-foreground">
								Frontend
							</h3>
							<ul className="list-disc space-y-1 pl-4">
								<li>Next.js (App Router), TypeScript</li>
								<li>Tailwind CSS v4, shadcn/ui (Radix + Tailwind)</li>
							</ul>
						</div>
						<div>
							<h3 className="text-lg font-semibold text-foreground">Backend</h3>
							<ul className="list-disc space-y-1 pl-4">
								<li>Next.js Route Handlers (/app/api)</li>
								<li>MongoDB + Mongoose</li>
							</ul>
						</div>
						<div>
							<h3 className="text-lg font-semibold text-foreground">AI</h3>
							<ul className="list-disc space-y-1 pl-4">
								<li>OpenAI embeddings: text-embedding-3-*</li>
								<li>OpenAI chat model: gpt-4.1-mini</li>
							</ul>
						</div>
						<div>
							<h3 className="text-lg font-semibold text-foreground">Tooling</h3>
							<ul className="list-disc space-y-1 pl-4">
								<li>Biome for lint/format</li>
								<li>TypeScript for type checking</li>
								<li>tsx for scripts (embeddings rebuild, etc.)</li>
							</ul>
						</div>
					</div>
				</section>

				<section className="space-y-3">
					<h2 className="text-3xl font-semibold tracking-tight text-foreground">
						Phases
					</h2>
					<div className="space-y-2">
						<h3 className="text-lg font-semibold text-foreground">
							Phase 0 – Core app
						</h3>
						<ul className="list-disc space-y-1 pl-4">
							<li>Init Next + TS + Tailwind + shadcn/ui</li>
							<li>MongoDB connection</li>
							<li>Admin create/edit products</li>
							<li>Catalogue grid + product detail pages</li>
						</ul>
					</div>
					<div className="space-y-2">
						<h3 className="text-lg font-semibold text-foreground">
							Phase 1 – Embeddings
						</h3>
						<ul className="list-disc space-y-1 pl-4">
							<li>OpenAI embeddings pipeline</li>
							<li>Chunking + storing embeddings (ProductChunk)</li>
							<li>Semantic search and product-level RAG</li>
						</ul>
					</div>
				</section>

				<section className="space-y-3">
					<h2 className="text-3xl font-semibold tracking-tight text-foreground">
						Limitations / demo notes
					</h2>
					<ul className="list-disc space-y-1 pl-4">
						<li>Demo only—no real payments.</li>
						<li>Admin routes are not protected in this demo.</li>
						<li>Small product sample; OpenAI calls incur token costs.</li>
					</ul>
				</section>

				<section className="space-y-3">
					<h2 className="text-3xl font-semibold tracking-tight text-foreground">
						Where to look in the code
					</h2>
					<ul className="list-disc space-y-1 pl-4">
						<li>
							<strong className="text-foreground">package.json:</strong>{" "}
							dependencies & scripts (next, mongoose, openai, tailwindcss,
							radix, zod, biome, etc.).
						</li>
						<li>
							<strong className="text-foreground">Products:</strong>{" "}
							<code className="text-foreground">app/features/products/...</code>{" "}
							(schemas, components, hooks).
						</li>
						<li>
							<strong className="text-foreground">Embedding/RAG:</strong>{" "}
							<code className="text-foreground">
								app/features/embedding/...
							</code>{" "}
							and{" "}
							<code className="text-foreground">
								app/api/products/ask/route.ts
							</code>
							.
						</li>
						<li>
							<strong className="text-foreground">Cart:</strong>{" "}
							<code className="text-foreground">app/features/cart/...</code> and{" "}
							<code className="text-foreground">app/cart/page.tsx</code>.
						</li>
						<li>
							<strong className="text-foreground">Admin:</strong>{" "}
							<code className="text-foreground">app/admin/product</code> and{" "}
							<code className="text-foreground">app/admin/product/[slug]</code>.
						</li>
						<li>
							<strong className="text-foreground">Layout:</strong>{" "}
							<code className="text-foreground">app/layout.tsx</code>{" "}
							(nav/footer) and{" "}
							<code className="text-foreground">
								app/features/layout/components
							</code>
							.
						</li>
					</ul>
				</section>
			</div>
		</div>
	);
}

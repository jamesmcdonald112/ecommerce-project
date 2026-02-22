import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default async function CommericalCaseStudyPage() {
	const filePath = path.join(
		process.cwd(),
		"content",
		"commerical-case-study.md",
	);
	const markdown = await readFile(filePath, "utf8");
	const markdownWithoutTopHeading = markdown.replace(
		/^\s*#\s+.*\n+/,
		"",
	);

	return (
		<div className="bg-background text-foreground">
			<div className="mx-auto max-w-5xl px-6 py-14 sm:py-20 lg:px-8">
				<section className="mb-10 space-y-4 text-center sm:text-left">
					<p className="text-sm font-semibold text-primary">Overview</p>
					<h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
						Commercial Case Study
					</h1>
					<p className="text-lg text-muted-foreground">
						A focused demo of semantic product search and AI-powered product
						Q&amp;A. If you want to try the shopping flow, use the buttons below.
					</p>
					<p className="text-sm font-medium text-foreground">
						Try it: Search → open a product → ask a question → add to cart.
					</p>
					<p className="text-sm text-muted-foreground">
						Current demo catalog is small (phones, laptops, and tablets).
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
				<article className="prose prose-neutral max-w-none dark:prose-invert">
					<ReactMarkdown>{markdownWithoutTopHeading}</ReactMarkdown>
				</article>
			</div>
		</div>
	);
}

"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ProductQnAProps = {
	productId: string;
};

type AskResponse = {
	success: boolean;
	answer?: string;
	sources?: string[];
	error?: string;
};

export function ProductQnA({ productId }: ProductQnAProps) {
	const [question, setQuestion] = React.useState("");
	const [answer, setAnswer] = React.useState<string | null>(null);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	async function askQuestion() {
		if (!question.trim() || loading) return;

		setLoading(true);
		setError(null);
		setAnswer(null);
		try {
			const res = await fetch("/api/products/ask", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					productId,
					question: question.trim(),
				}),
			});

			const data: AskResponse = await res.json();

			if (!res.ok || !data.success) {
				throw new Error(data.error || "Something went wrong");
			}

			setAnswer(data.answer ?? null);
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.error(err);
				setError(err.message);
			} else {
				console.error("Unknown error", err);
				setError("Failed to get an answer.");
			}
		} finally {
			setLoading(false);
		}
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		await askQuestion();
	}

	async function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			await askQuestion();
		}
	}

	return (
		<Card className="mt-8">
			<CardHeader>
				<CardTitle>Ask about this product</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="product-question">Question</Label>
						<Textarea
							id="product-question"
							placeholder="e.g. Does this support dual SIM? How is the battery life?"
							value={question}
							onChange={(e) => setQuestion(e.target.value)}
							onKeyDown={handleKeyDown}
							rows={3}
						/>
					</div>

					<Button type="submit" disabled={loading || !question.trim()}>
						{loading ? "Asking..." : "Ask"}
					</Button>
				</form>

				{error && <p className="mt-4 text-sm text-red-500">{error}</p>}

				{answer && (
					<div className="mt-6 space-y-2">
						<h3 className="text-sm font-semibold">Answer</h3>
						<p className="text-sm whitespace-pre-line">{answer}</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}

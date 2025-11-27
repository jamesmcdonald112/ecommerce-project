import OpenAI from "openai";

const openai = new OpenAI();

export async function generateEmbedding(text: string): Promise<number[]> {
	try {
		if (!text || text.trim().length === 0) {
			throw new Error("Cannot generate embedding: text is empty.");
		}

		const response = await openai.embeddings.create({
			model: "text-embedding-3-small",
			input: text,
			encoding_format: "float",
		});

		const embedding = response.data?.[0]?.embedding;

		if (!embedding) {
			throw new Error("OpenAI returned no embedding.");
		}

		return embedding;
	} catch (err: unknown) {
		console.error("Embedding generation failed:", err);

		// If this is an Error you explicitly threw  keep it
		if (err instanceof Error) {
			throw err;
		}

		// Otherwise convert unknown errors to a clean generic error
		throw new Error("Failed to generate embedding.");
	}
}

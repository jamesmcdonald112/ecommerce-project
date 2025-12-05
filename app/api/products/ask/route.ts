import { Types } from "mongoose";
import { type NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import ProductChunk from "@/app/features/embedding/models/ProductChunk";
import { generateEmbedding } from "@/app/features/embedding/utils/generateEmbedding";
import dbConnect from "@/app/lib/mongodb";

const MIN_SCORE = 0.63;

export async function POST(req: NextRequest) {
  try {
    const { productId, question } = await req.json();

    if (!productId) {
      return NextResponse.json(
        { success: false, error: "Missing productId" },
        { status: 400 }
      );
    }

    if (!question) {
      return NextResponse.json(
        { success: false, error: "Missing question" },
        { status: 400 }
      );
    }

    await dbConnect();

    // 1. Embed the user question
    const qEmbedding = await generateEmbedding(question);

    // 2. Vector search restricted to ONE product
    const chunks = await ProductChunk.aggregate([
      {
        $vectorSearch: {
          index: "default",
          path: "embedding",
          queryVector: qEmbedding,
          filter: {
            productId: new Types.ObjectId(productId as string),
          },
          numCandidates: 30,
          limit: 5,
        },
      },
      {
        $project: {
          _id: 0,
          text: 1,
          score: { $meta: "vectorSearchScore" },
        },
      },
    ]);

    const filtered = chunks.filter((c) => c.score >= MIN_SCORE);

    if (filtered.length === 0) {
      return NextResponse.json({
        success: true,
        answer: "Not enough product information to answer that.",
        sources: [],
      });
    }

    // 3. Build context
    const context = filtered.map((c) => c.text).join("\n\n");

    // 4. Call LLM
    const client = new OpenAI();

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "developer",
          content:
            "You are a product expert. Use ONLY the provided product context to answer the user's question. Summarize the relevant information concisely. Do NOT repeat the full context. Do NOT invent facts. If the context does not contain the answer, say so.",
        },
        {
          role: "user",
          content: `Context:\n${context}\n\n Question: ${question}`,
        },
      ],
      temperature: 0,
    });

    const answer = response.output_text;

    return NextResponse.json({
      success: true,
      answer,
      sources: filtered.map((c) => c.text),
    });
  } catch (err) {
    console.error("RAG error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}



# AI-Powered E-Commerce Platform

[Live demo](https://ecommerce-project-m141alyn3-james-mcdonalds-projects-1ae069d6.vercel.app/)

Full-stack AI e-commerce demo with semantic search, per-product RAG Q&A, and a complete admin + cart flow.

---

## 1. Overview

This project is a full-stack AI-powered e-commerce platform built with Next.js, MongoDB, and OpenAI.

It demonstrates:
- Semantic product search using embeddings and MongoDB `$vectorSearch`.
- Per-product retrieval-augmented generation (RAG) Q&A.
- A realistic shopping flow with catalogue, product pages, and cart.
- Admin tools for creating and editing products.

Tech highlights: **Next.js 16 (App Router), React 19, TypeScript, MongoDB/Mongoose, OpenAI (text-embedding-3-small, gpt-4.1-mini), Tailwind v4, shadcn/ui, Zod, React Hook Form, Biome.**

---

## 2. Features

### User-facing

- **Product catalogue** – responsive grid listing products with title, price, and image.
- **Product detail page** – gallery, descriptions, specs, reviews, add-to-cart.
- **Semantic search** – natural-language search ("phone good for travel") powered by embeddings + `$vectorSearch`.
- **Per-product AI Q&A** – ask questions on a product page; answers are grounded in stored product data (RAG).
- **Cart** – add/remove items, adjust quantities, persistent via `localStorage`, order summary.

### Admin / internal

- **Admin create product** (`/admin/products/new`) – schema-driven form with validation.
- **Admin edit product** (`/admin/products/[slug]`) – pre-filled form for updates.
- Dynamic field arrays for **images**, **reviews**, and **specifications** (key/value pairs).
- Shared Zod schemas between frontend forms and backend APIs.

---

## 3. Architecture

### Frontend

- **Next.js App Router** with server and client components.
- **React 19 + TypeScript** for type-safe UI.
- **Tailwind v4 + shadcn/ui (Radix)** for styling and reusable components.
- **React Hook Form + Zod** for strongly typed forms and validation.
- **React Context** for global cart state, plus custom hooks for search and form submission.

### Backend

- **Next.js Route Handlers** under `app/api/**` for all APIs:
  - `/api/products` – list + create products.
  - `/api/products/[slug]` – fetch + update a single product.
  - `/api/search` – semantic search across all products.
  - `/api/products/ask` – per-product Q&A using RAG.
- Shared Zod schemas for request validation.
- Custom error types (BadRequestError, NotFoundError) mapped to JSON responses.

### Database

- **MongoDB + Mongoose**.
- `Product` model: title, slug, price, short/long descriptions, specs (Map), images, reviews, timestamps.
- `ProductChunk` model: `productId`, `text` chunk, `embedding: number[]`, timestamps.

### AI layer

- OpenAI embeddings: `text-embedding-3-small`.
- OpenAI completions: `gpt-4.1-mini`.
- Used for semantic search and RAG Q&A.

### Cart

- `CartContext` stores `Record<slug, quantity>`.
- Hydrated from `localStorage` on mount; persisted on updates.
- Cart page merges cart state with product data fetched from APIs.

---

## 4. API Overview

All endpoints return JSON.

### `GET /api/products`

List products, optional keyword filter via `?q=`.

```http
GET /api/products?q=phone
```

```json
{
  "success": true,
  "data": [
    { "slug": "travel-phone-x", "title": "Travel Phone X", "price": 799 }
  ]
}
```

### `POST /api/products`

Create a product. Body must match the Zod `productSchema`.

```json
{
  "title": "Travel Phone X",
  "slug": "travel-phone-x",
  "price": 799,
  "shortDescription": "Rugged phone with long battery life.",
  "longDescription": "Long form description...",
  "images": ["/images/travel-phone-x-1.jpg"],
  "specRows": [
    { "key": "Battery", "value": "5000 mAh" }
  ],
  "reviews": [
    { "author": "Alice", "rating": 5, "comment": "Perfect for travel." }
  ]
}
```

### `GET /api/products/[slug]`

Fetch a single product by slug.

### `PUT /api/products/[slug]`

Update a product. Body matches an `updateProductSchema` variant of the create payload.

### `GET /api/search`

Semantic search across all products using embeddings + `$vectorSearch`.

```http
GET /api/search?q=phone+good+for+travel
```

Returns products ordered by semantic relevance.

### `POST /api/products/ask`

Per-product Q&A using RAG.

```json
{
  "productId": "65f0...",
  "question": "Is this phone suitable for long trips without charging?"
}
```

Returns a grounded answer plus optionally the text chunks used.

---

## 5. Installation

### 5.1 Prerequisites

- Node.js (LTS)
- npm or pnpm
- MongoDB (local or Atlas)
- OpenAI API key

### 5.2 Setup

```bash
git clone https://github.com/jamesmcdonald112/ecommerce-project
cd ecommerce-project
npm install
```

Create a `.env` file in the project root:

```env
OPENAI_API_KEY=sk-...
MONGODB_URI=mongodb+srv://user:password@cluster/dbname
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 5.3 Run

```bash
npm run dev    # http://localhost:3000
```

For production:

```bash
npm run build
npm run start
```

Optional: rebuild all embeddings after big product changes:

```bash
npm run rebuild
```

---

## 6. Scripts

From `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "format": "biome format . --write",
    "lint": "biome lint . --write",
    "check": "biome check .",
    "tidy": "biome check . --write",
    "commit": "commit",
    "t": "tsx --env-file=.env app/features/embedding/textExamples.ts",
    "rebuild": "tsx --env-file=.env app/features/embedding/scripts/rebuildAllEmbeddings.ts"
  }
}
```

- `dev` – start Next.js dev server.
- `build` – build for production.
- `start` – run production server.
- `format` / `lint` / `check` / `tidy` – Biome format + lint + checks.
- `t` – run embedding text example script.
- `rebuild` – rebuild all product embeddings.

---

## 7. Environment Variables

Core variables (in `.env`):

- `OPENAI_API_KEY` – OpenAI API key for embeddings and GPT.
- `MONGODB_URI` – MongoDB connection string.
- `NEXT_PUBLIC_BASE_URL` – base URL for API calls in the frontend (e.g. `http://localhost:3000`).

---

## 8. Data Models (Conceptual)

### Product

- `title: string`
- `slug: string` (unique)
- `price: number`
- `shortDescription: string`
- `longDescription: string`
- `specs: Map<string, string>` (stored as a map in MongoDB)
- `images: string[]`
- `reviews: { author: string; rating: number; comment: string }[]`
- `createdAt / updatedAt`

### ProductChunk

- `productId: ObjectId` (ref Product)
- `text: string` (chunk of product info)
- `embedding: number[]`
- `createdAt / updatedAt`

---

## 9. AI / Embeddings, Semantic Search & RAG

### 9.1 Embedding pipeline

1. Build a single text blob from title, descriptions, specs, and reviews.
2. Chunk the text into ~500 character segments at word boundaries.
3. Generate an embedding for each chunk using `text-embedding-3-small`.
4. Store each `{ productId, text, embedding }` in `ProductChunk`.

A TypeScript script (`npm run rebuild`) rebuilds embeddings for all products.

### 9.2 Semantic search (`GET /api/search`)

1. Embed the user query with `text-embedding-3-small`.
2. Run `$vectorSearch` against `ProductChunk` with a minimum similarity score.
3. Group results by `productId` and rank products by similarity.
4. Fetch those products and return them ordered by relevance.

### 9.3 Per-product RAG Q&A (`POST /api/products/ask`)

1. Validate `productId` and `question`.
2. Embed the question.
3. Run `$vectorSearch` on chunks filtered by `productId`.
4. Build a context string from the top chunks.
5. Call `gpt-4.1-mini` with a system prompt that forbids invented facts and forces use of context only.
6. Return the model’s answer (and optionally the chunks used).

---

## 10. Cart System

- Cart state stored in `CartContext` as `Record<slug, quantity>`.
- State is hydrated from `localStorage` on the client after mount.
- Updates to the cart are immediately written back to `localStorage`.
- Cart page:
  - Reads slugs and quantities from context.
  - Fetches product details from `/api/products/[slug]`.
  - Merges quantity + product data to render line items and totals.
- Add-to-cart buttons use the context actions and show toast feedback.

---

## 11. Limitations & Future Work

Current limitations:
- No authentication or user accounts.
- No payments / checkout flow.
- No rate limiting or monitoring around AI endpoints.
- Admin pages are demo-only and not locked down.

Possible future improvements:
- Add auth + order history.
- Integrate Stripe or another payment provider.
- Add tests for APIs, embeddings, and cart logic.
- Add logging/metrics and rate limiting for AI calls.
- Support multiple embedding providers / a dedicated vector database.

---

## 12. License
MIT License

Copyright (c) [2025] [James McDonald]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
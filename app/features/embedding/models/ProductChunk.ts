import mongoose, { Schema } from "mongoose";

const ProductChunkSchema = new Schema(
	{
		productId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "Product",
		},
		text: {
			type: String,
			required: true,
		},
		embedding: {
			type: [Number],
			required: true,
		},
	},
	{
		timestamps: {
			createdAt: true,
			updatedAt: false,
		},
	},
);

export default mongoose.models.ProductChunk ||
	mongoose.model("ProductChunk", ProductChunkSchema);

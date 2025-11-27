import mongoose, { type InferSchemaType, Schema } from "mongoose";

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

export type ProductChunkDocument = InferSchemaType<
	typeof ProductChunkSchema
> & {
	_id: mongoose.Types.ObjectId;
};

export default mongoose.models.ProductChunk ||
	mongoose.model("ProductChunk", ProductChunkSchema);

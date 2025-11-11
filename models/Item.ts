import mongoose from "mongoose";

interface Item extends mongoose.Document {
	name: string;
	description: string;
}

const ItemSchema = new mongoose.Schema<Item>({
	name: {
		type: String,
		required: [true, "Please provide a name for this item"],
		maxLength: [60, "The item name cannot be more than 60 characters"],
	},
	description: {
		type: String,
		required: [true, "Please provide a description for this item"],
		maxLength: [200, "The item description cannot be more than 200 characters"],
	},
});

export default mongoose.models.Item || mongoose.model<Item>("Item", ItemSchema);

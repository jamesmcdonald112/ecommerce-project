import mongoose, { type Mongoose } from "mongoose";

interface MongooseCache {
	conn: Mongoose | null;
	promise: Promise<Mongoose> | null;
}

declare global {
	var mongooseCache: MongooseCache | undefined; // This must be a `var` and not a `let / const`
}

const cached: MongooseCache = global.mongooseCache ?? {
	conn: null,
	promise: null,
};

global.mongooseCache = cached;

async function dbConnect(): Promise<Mongoose> {
	const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

	if (!MONGODB_URI) {
		throw new Error(
			"Please define the MONGODB_URI environment variable inside .env.local",
		);
	}

	if (cached.conn) {
		return cached.conn;
	}
	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		}; // makes errors appear immediately, safer for APIs.
		cached.promise = mongoose.connect(MONGODB_URI, opts);
	}
	try {
		cached.conn = await cached.promise;
	} catch (e: unknown) {
		cached.promise = null;
		throw e;
	}

	return cached.conn;
}

export default dbConnect;

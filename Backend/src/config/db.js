import mongoose from "mongoose";

export async function connectToDatabase(mongoUri) {
	if (!mongoUri) {
		throw new Error("Missing MongoDB URI. Set MONGODB_URI in .env");
	}
	mongoose.set("strictQuery", true);
	await mongoose.connect(mongoUri, {
		serverSelectionTimeoutMS: 10000
	});
	return mongoose.connection;
}

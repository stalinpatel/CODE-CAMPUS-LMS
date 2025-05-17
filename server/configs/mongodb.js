import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined in environment variables");
  throw new Error("Please define MONGODB_URI in environment");
}

let cached = global.mongoose;

if (!cached) {
  console.log("🔄 Initializing global mongoose cache");
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log("✅ Using existing MongoDB connection from cache");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("🆕 Creating new MongoDB connection...");
    cached.promise = mongoose.connect(`${MONGODB_URI}/lms`, {
      bufferCommands: false,
    });
  } else {
    console.log("⏳ Awaiting existing MongoDB connection promise");
  }

  try {
    cached.conn = await cached.promise;
    console.log("🚀 MongoDB connected successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    throw err;
  }

  return cached.conn;
}
export default connectDB;

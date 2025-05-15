import mongoose from "mongoose";

// connect to database

const connectDB = async () => {
  mongoose
    .connect(`${process.env.MONGODB_URI}/lms`)
    .then(() => {
      console.log("Connected to MongoDB ✅");
    })
    .catch((err) => {
      console.error("MongoDB Connection Error ❌:", err.message);
    });
};

export default connectDB;

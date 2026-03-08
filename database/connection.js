import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongouri = process.env.MONGOURI;

const connectDB = async () => {
  if (!mongouri) {
    throw new Error("MONGOURI is not set in environment variables");
  }

  await mongoose.connect(mongouri, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
  });

  console.log("mongo connected");
};

export default connectDB;

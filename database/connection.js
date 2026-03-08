import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongouri = process.env.MONGOURI;
let connectPromise = null;

const connectDB = async () => {
  if (!mongouri) {
    throw new Error("MONGOURI is not set in environment variables");
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectPromise) {
    connectPromise = mongoose
      .connect(mongouri, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
      })
      .then((conn) => {
        console.log("mongo connected");
        return conn.connection;
      })
      .catch((err) => {
        connectPromise = null;
        throw err;
      });
  }

  return connectPromise;
};

export default connectDB;

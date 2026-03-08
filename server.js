// Imports
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./database/connection.js";
import router from "./routes/routeNames.js";

// Configurations
dotenv.config();

// App setup
const app = express();
app.use(cors());
app.use(express.json());
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("MongoDB connection failed:", err.message || err);
    return res
      .status(500)
      .json({ error: "Server database connection failed" });
  }
});
app.use(router);

//test Routes
app.get("/", (req, res) => {
  return res.status(200).json({ success: "response from get api" });
});

if (process.env.VERCEL !== "1") {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`server run at ${port}`);
  });
}

export default app;

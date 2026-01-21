import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: false,
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "";

if (!MONGO_URI) {
  console.warn(
    "No MONGO_URI provided. Auth endpoints will respond with 503 (service unavailable)."
  );

  app.use((req, res) => {
    res
      .status(503)
      .json({ message: "Database not configured. Please set MONGO_URI." });
  });

  app.listen(PORT, () => {
    console.log(`Server running in NO-DB mode on port ${PORT}`);
  });
} else {
  mongoose
    .connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    })
    .then(() => {
      console.log("MongoDB connected");
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err.message);
      process.exit(1);
    });
}


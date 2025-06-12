import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import menuRoutes from "./routes/menuRoutes";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/menus", menuRoutes);

// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    // Start the server only after DB is connected
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

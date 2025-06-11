import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/gameRoutes.js";

dotenv.config();
const app = express();

// CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Only accept JSON
app.use((req, res, next) => {
  if (req.header('Accept') !== 'application/json' && req.method !== 'OPTIONS') {
    return res.status(406).json({ error: 'Only JSON is allowed as Accept header' });
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err.message));

app.use("/api/game", router);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

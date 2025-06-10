// models/reward.js
import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  imageUrl: { type: String }, // Optional
  description: { type: String }
});

export default mongoose.model("Reward", rewardSchema);
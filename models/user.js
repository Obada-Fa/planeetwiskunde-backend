// models/user.js (updated)
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: Number, default: 0 },
  coins: { type: Number, default: 0 },
  upgradeStage: { type: Number, default: 1 },
  inventory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reward' }]
});

export default mongoose.model("User", userSchema);
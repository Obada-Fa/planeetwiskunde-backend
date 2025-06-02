import mongoose from "mongoose";

const ScoreSchema = new mongoose.Schema({
  playerName: String,
  level: Number,
  time: Number,
  correct: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Score", ScoreSchema);

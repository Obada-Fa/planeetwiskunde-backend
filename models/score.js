import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
  game: { type: String, required: true }, 
  score: { type: Number, required: true },
  attempt: { type: Number, default: 1 },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Score', scoreSchema);

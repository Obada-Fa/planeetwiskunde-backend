import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  number_1: { type: Number, required: true },
  number_2: { type: Number, required: true },
  type: { type: String, required: true } // 'addition', 'subtraction', etc.
});

export default mongoose.model('Question', questionSchema);
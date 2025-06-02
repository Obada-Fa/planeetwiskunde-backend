import Score from '../models/score.js';

export const getLevel = (req, res) => {
  const { id } = req.params;
  res.json({ levelId: id, question: "Touch the red square" });
};

export const submitAnswer = (req, res) => {
  const { levelId, answer } = req.body;
  const correct = answer === 'red';
  res.json({ correct });
};

export const saveScore = async (req, res) => {
  try {
    const { playerName, level, time, correct } = req.body;
    if (!playerName || level == null || time == null || correct == null) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newScore = new Score({ playerName, level, time, correct });
    const saved = await newScore.save();
    res.status(201).json({ message: "Score saved", score: saved });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

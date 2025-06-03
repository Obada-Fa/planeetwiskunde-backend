import Score from '../models/score.js';
import User from '../models/user.js';
import Question from '../models/question.js';



export const registerUser = async (req, res) => {
  try {
    const { name, password, role } = req.body;
    const user = new User({ name, password, role });
    await user.save();
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(500).json({ error: 'Could not create user', details: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

export const createQuestion = async (req, res) => {
  try {
    const { number_1, number_2, type } = req.body;
    const question = new Question({ number_1, number_2, type });
    await question.save();
    res.status(201).json({ message: 'Question created', question });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save question', details: err.message });
  }
};

export const getQuestionByType = async (req, res) => {
  const { type } = req.params;
  const questions = await Question.find({ type });

  if (!questions.length) {
    return res.status(404).json({ message: 'No questions found for this type' });
  }

  const randomIndex = Math.floor(Math.random() * questions.length);
  res.json(questions[randomIndex]);
};

export const getUserScores = async (req, res) => {
  const { userId } = req.params;
  const scores = await Score.find({ user_id: userId });
  res.json(scores);
};


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
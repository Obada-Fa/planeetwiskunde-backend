import Score from '../models/score.js';
import User from '../models/user.js';
import Question from '../models/question.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  try {
    const { name, password, role } = req.body;

    const checkUser = await User.findOne({name})
    if(checkUser){
      return res.status(400).json({error: 'username already taken'})
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = new User({ name, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(500).json({ error: 'Could not create user', details: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({users});
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Interne serverfout' });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "Gebruiker niet gevonden" });
    }

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Interne serverfout", details: err.message });
  }
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
    const { game, score, attempt, user_id } = req.body;

    if (!game || score === undefined || !user_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newScore = new Score({ game, score, attempt, user_id });
    const saved = await newScore.save();

    res.status(201).json({ message: "Score saved", score: saved });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({name})

    if(!user){
      return res.status(400).json({message: 'no user found'})
    }

    const passwordCompare = await bcrypt.compare(password, user.password)

    if(!passwordCompare){
      return res.status(400).json({message: 'password is wrong'})
    }

    const { password: pw, ...userWithoutPassword } = user.toObject();

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
    res.json({message: 'Logged in', token, user:userWithoutPassword})
  } catch (error){
    res.status(500).json({message: "couldn't login"})
  }
}

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(400).json({ message: 'user not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Serverfout', error });
  }
};

export const updateCoins = async (req, res) => {
  const {amount} = req.body

  try{
    const user = await User.findById(req.userId)
    if(!user){
      return res.status(400).json({message: 'no user found'})
    }

    user.coins = user.coins + amount

    await user.save()

    res.json({message: 'Coins added', coins: user.coins})
  }catch (error){
    res.status(400).json({message: error})
  }
}

export const logOutUser = async (req, res) =>{
  try{
    res.json({message: 'logged out'})
  }catch (error){
    res.status(500).json({message: error})
  }
}
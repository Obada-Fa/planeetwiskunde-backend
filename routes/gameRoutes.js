import express from 'express';
import {
  getLevel,
  submitAnswer,
  saveScore,
  registerUser,
  getAllUsers,
  createQuestion,
  getQuestionByType,
  getUserById,
  getUserScores, loginUser, getCurrentUser, updateCoins, logOutUser,
} from '../controllers/gameController.js';

import {authentication} from "../middlewares/auth.js";

const router = express.Router();

// Existing routes
router.get('/level/:id', getLevel);
router.post('/answer', submitAnswer);
router.post('/score', saveScore);

router.post('/user', registerUser);
router.get('/users', getAllUsers);
router.get('/user/:id', getUserById);

router.get('/me', authentication, getCurrentUser)
router.post('/me/coins', authentication, updateCoins)

router.post('/login', loginUser)
router.post('/logout', logOutUser)

router.post('/question', createQuestion);
router.get('/questions/:type', getQuestionByType);

router.get('/scores/:userId', getUserScores);

export default router;

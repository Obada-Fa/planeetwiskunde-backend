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
  getUserScores, loginUser, getCurrentUser, updateCoins,getRewards, buyReward, getUserCoins,
  createReward,logOutUser
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

router.get('/rewards', getRewards);
router.post('/user/:id/rewards/:rewardId', buyReward);
router.post('/rewards', createReward);

router.get('/user/:id/coins', getUserCoins);


export default router;

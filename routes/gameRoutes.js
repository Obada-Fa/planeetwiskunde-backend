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
  getUserScores, loginUser,
} from '../controllers/gameController.js';

const router = express.Router();

// Existing routes
router.get('/level/:id', getLevel);
router.post('/answer', submitAnswer);
router.post('/score', saveScore);

router.post('/user', registerUser);
router.get('/users', getAllUsers);
router.get('/user/:id', getUserById);

router.post('/login', loginUser)

router.post('/question', createQuestion);
router.get('/questions/:type', getQuestionByType);

router.get('/scores/:userId', getUserScores);

export default router;

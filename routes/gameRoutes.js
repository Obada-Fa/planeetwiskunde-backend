import express from 'express';
import { getLevel, submitAnswer, saveScore } from '../controllers/gameController.js';

const router = express.Router();

router.get('/level/:id', getLevel);
router.post('/answer', submitAnswer);
router.post('/score', saveScore);

export default router;

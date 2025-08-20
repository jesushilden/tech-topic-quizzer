import { Router } from 'express';
import { QuizController } from '../controllers/quizController.js';

const router = Router();

router.get('/today', QuizController.getTodaysQuiz);

export { router as quizRoutes };
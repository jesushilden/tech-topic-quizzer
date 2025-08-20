import { Request, Response } from 'express';
import { TopicService } from '../services/topicService.js';
import { QuizService } from '../services/quizService.js';

export class QuizController {
  static async getTodaysTopic(req: Request, res: Response) {
    try {
      const topic = await TopicService.getTodaysTopic();
      res.json(topic);
    } catch (error) {
      console.error('Error getting today\'s topic:', error);
      res.status(500).json({ error: 'Failed to get today\'s topic' });
    }
  }

  static async generateQuiz(req: Request, res: Response) {
    try {
      const { topic } = req.body;
      
      if (!topic) {
        return res.status(400).json({ error: 'Topic is required' });
      }

      const quiz = await QuizService.generateQuiz(topic);
      res.json(quiz);
    } catch (error) {
      console.error('Error generating quiz:', error);
      res.status(500).json({ error: 'Failed to generate quiz' });
    }
  }

  static async getTodaysQuiz(req: Request, res: Response) {
    try {
      const topic = await TopicService.getTodaysTopic();
      const quiz = await QuizService.generateQuiz(topic.name);
      res.json(quiz);
    } catch (error) {
      console.error('Error getting today\'s quiz:', error);
      res.status(500).json({ error: 'Failed to get today\'s quiz' });
    }
  }
}
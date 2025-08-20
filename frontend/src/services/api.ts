import axios from 'axios';
import type { Topic, Quiz } from '../types/quiz';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const quizAPI = {
  getTodaysTopic: async (): Promise<Topic> => {
    const response = await api.get('/quiz/topic');
    return response.data;
  },

  getTodaysQuiz: async (): Promise<Quiz> => {
    const response = await api.get('/quiz/today');
    return response.data;
  },

  generateQuiz: async (topic: string): Promise<Quiz> => {
    const response = await api.post('/quiz/generate', { topic });
    return response.data;
  },
};
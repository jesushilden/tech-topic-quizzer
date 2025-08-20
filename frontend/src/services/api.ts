import axios from 'axios';
import type { Quiz } from '../types/quiz';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const quizAPI = {
  getTodaysQuiz: async (): Promise<Quiz> => {
    const response = await api.get('/quiz/today');
    return response.data;
  },
};
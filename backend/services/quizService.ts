import axios from 'axios';
import { Quiz, Question } from '../models/Topic.js';

export class QuizService {
  static async generateQuiz(topic: string): Promise<Quiz> {
    try {
      const response = await axios.post(`${process.env.LITELLM_API_URL}/chat/completions`, {
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a quiz generator. Create exactly 4 multiple choice questions about the given technology topic. Each question should have 4 options and only one correct answer. Return a valid JSON object with this exact structure: {"questions": [{"question": "...", "options": ["A", "B", "C", "D"], "correctAnswer": 0, "explanation": "..."}]}. The correctAnswer should be the index (0-3) of the correct option.'
          },
          {
            role: 'user',
            content: `Generate 4 multiple choice questions about ${topic}. Make them educational and at an intermediate level.`
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.LITELLM_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      let content = response.data.choices[0].message.content.trim();
      
      // Remove markdown code blocks if present
      if (content.startsWith('```json')) {
        content = content.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (content.startsWith('```')) {
        content = content.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      
      const quizData = JSON.parse(content);
      
      const questions: Question[] = quizData.questions.map((q: any, index: number) => ({
        id: `q-${index + 1}`,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation
      }));

      const timestamp = Date.now();
      return {
        id: `quiz-${timestamp}`,
        topicId: `topic-${timestamp}`,
        topic,
        questions,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error generating quiz:', error);
      throw new Error('Failed to generate quiz');
    }
  }
}
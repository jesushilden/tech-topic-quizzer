export interface Topic {
  id: string;
  name: string;
  description: string;
  date: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  topicId: string;
  topic: string;
  questions: Question[];
  createdAt: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  answers: {
    questionId: string;
    selectedAnswer: number;
    correct: boolean;
  }[];
}
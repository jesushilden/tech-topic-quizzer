import { useState, useEffect } from 'react';
import type { Quiz as QuizType, QuizResult } from '../types/quiz';
import { quizAPI } from '../services/api';
import { QuestionCard } from './QuestionCard';
import { QuizResults } from './QuizResults';
import { LoadingSpinner } from './LoadingSpinner';
import { cn } from '../lib/utils';

export function Quiz() {
  const [quiz, setQuiz] = useState<QuizType | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        setLoading(true);
        const todaysQuiz = await quizAPI.getTodaysQuiz();
        setQuiz(todaysQuiz);
        setSelectedAnswers(new Array(todaysQuiz.questions.length).fill(-1));
      } catch (err) {
        setError('Failed to load quiz. Please try again later.');
        console.error('Error loading quiz:', err);
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateResults = (): QuizResult => {
    if (!quiz) return { score: 0, totalQuestions: 0, answers: [] };

    const answers = quiz.questions.map((question, index) => ({
      questionId: question.id,
      selectedAnswer: selectedAnswers[index],
      correct: selectedAnswers[index] === question.correctAnswer,
    }));

    const score = answers.filter(answer => answer.correct).length;

    return {
      score,
      totalQuestions: quiz.questions.length,
      answers,
    };
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers(new Array(quiz?.questions.length || 0).fill(-1));
    setShowResults(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
        <div className="bg-neutral-50 rounded-xl shadow-xl p-8 max-w-md mx-4 animate-fade-in">
          <div className="text-center">
            <div className="text-red-500 mb-4 animate-bounce-gentle">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.963-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">Oops! Something went wrong</h2>
            <p className="text-neutral-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return null;
  }

  if (showResults) {
    const results = calculateResults();
    return <QuizResults quiz={quiz} results={results} onRestart={restartQuiz} />;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const canProceed = selectedAnswers[currentQuestionIndex] !== -1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-purple/10 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-topic font-bold text-neutral-900 mb-4 bg-gradient-to-r from-primary-600 to-accent-purple bg-clip-text text-transparent">Tech Topic Quiz</h1>
          <p className="text-xl font-semibold text-neutral-700 mb-6 bg-neutral-50 px-6 py-3 rounded-full shadow-sm">{quiz.topic}</p>
          <div className="flex items-center justify-center space-x-2 text-sm text-neutral-500">
            <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
            <div className="w-40 bg-neutral-200 rounded-full h-3 shadow-inner">
              <div
                className="bg-gradient-to-r from-primary-500 to-accent-purple h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <QuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswers[currentQuestionIndex]}
          onAnswerSelect={handleAnswerSelect}
        />

        <div className="flex justify-between items-center mt-8 animate-slide-up">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={cn(
              "flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 transform",
              currentQuestionIndex === 0
                ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                : "bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border border-neutral-200 hover:scale-105 shadow-md hover:shadow-lg"
            )}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={cn(
              "flex items-center space-x-2 px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform",
              !canProceed
                ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                : "bg-gradient-to-r from-primary-500 to-accent-purple text-white hover:from-primary-600 hover:to-accent-purple/90 hover:scale-105 shadow-lg hover:shadow-xl"
            )}
          >
            <span>{isLastQuestion ? 'Finish Quiz' : 'Next'}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
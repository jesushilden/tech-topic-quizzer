import type { Quiz, QuizResult } from '../types/quiz';

interface QuizResultsProps {
  quiz: Quiz;
  results: QuizResult;
  onRestart: () => void;
}

export function QuizResults({ quiz, results, onRestart }: QuizResultsProps) {
  const percentage = Math.round((results.score / results.totalQuestions) * 100);
  
  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 80) return 'Excellent work!';
    if (percentage >= 60) return 'Good job!';
    return 'Keep learning!';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-purple/10 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-topic font-bold text-neutral-900 mb-4 bg-gradient-to-r from-accent-green to-primary-600 bg-clip-text text-transparent">Quiz Complete!</h1>
          <p className="text-lg text-gray-600">{quiz.topic}</p>
        </div>

        <div className="bg-neutral-50 rounded-xl shadow-xl p-8 mb-8 animate-slide-up border border-neutral-100">
          <div className="text-center mb-10">
            <div className={`text-7xl font-bold mb-6 ${getScoreColor(percentage)} animate-bounce-gentle`}>
              {percentage}%
            </div>
            <h2 className="text-3xl font-semibold text-neutral-900 mb-4">
              {getScoreMessage(percentage)}
            </h2>
            <p className="text-neutral-600 text-lg">
              You got {results.score} out of {results.totalQuestions} questions correct
            </p>
          </div>

          <div className="space-y-6">
            {quiz.questions.map((question, index) => {
              const userAnswer = results.answers[index];
              const isCorrect = userAnswer.correct;
              
              return (
                <div
                  key={question.id}
                  className={`border-2 rounded-lg p-6 ${
                    isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-start space-x-3 mb-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
                      isCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {isCorrect ? '✓' : '✗'}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900 mb-4 text-lg">
                        Question {index + 1}: {question.question}
                      </h3>
                      
                      <div className="space-y-3">
                        {question.options.map((option, optionIndex) => {
                          const isSelected = userAnswer.selectedAnswer === optionIndex;
                          const isCorrectAnswer = optionIndex === question.correctAnswer;
                          
                          let optionClass = 'p-3 rounded-lg border-2 transition-all duration-200 ';
                          if (isCorrectAnswer) {
                            optionClass += 'border-green-400 bg-gradient-to-r from-green-100 to-green-200 text-green-800 shadow-sm';
                          } else if (isSelected && !isCorrect) {
                            optionClass += 'border-red-400 bg-gradient-to-r from-red-100 to-red-200 text-red-800 shadow-sm';
                          } else {
                            optionClass += 'border-neutral-200 bg-neutral-50 text-neutral-600';
                          }
                          
                          return (
                            <div key={optionIndex} className={optionClass}>
                              <span className="font-semibold">
                                {String.fromCharCode(65 + optionIndex)}.
                              </span>
                              <span className="ml-2">{option}</span>
                              {isSelected && (
                                <span className="ml-2 text-sm">
                                  (Your answer)
                                </span>
                              )}
                              {isCorrectAnswer && (
                                <span className="ml-2 text-sm">
                                  (Correct answer)
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      
                      {question.explanation && (
                        <div className="mt-4 p-4 bg-gradient-to-r from-primary-50 to-accent-purple/10 border border-primary-200 rounded-lg">
                          <p className="text-sm text-primary-800">
                            <strong>Explanation:</strong> {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center space-x-6 animate-fade-in">
          <button
            onClick={onRestart}
            className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Retake This Quiz
          </button>
          <button
            onClick={() => window.location.reload()}
            className="bg-accent-green hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Take Another Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
import type { Question } from '../types/quiz';
import { cn } from '../lib/utils';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number;
  onAnswerSelect: (answerIndex: number) => void;
}

export function QuestionCard({ question, selectedAnswer, onAnswerSelect }: QuestionCardProps) {
  return (
    <div className="bg-neutral-50 rounded-xl shadow-xl p-8 animate-fade-in border border-neutral-100">
      <h2 className="text-question font-semibold text-neutral-900 mb-8 leading-relaxed">
        {question.question}
      </h2>
      
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            className={cn(
              "w-full text-left p-5 rounded-xl border-2 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02]",
              selectedAnswer === index
                ? "border-primary-500 bg-gradient-to-r from-primary-50 to-accent-purple/10 text-primary-900 shadow-md"
                : "border-neutral-200 bg-neutral-50 hover:border-primary-300 text-neutral-700 hover:bg-neutral-100"
            )}
          >
            <div className="flex items-center">
              <div className={cn(
                "w-7 h-7 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-200",
                selectedAnswer === index
                  ? "border-primary-500 bg-gradient-to-r from-primary-500 to-accent-purple shadow-sm"
                  : "border-neutral-300 hover:border-primary-400"
              )}>
                {selectedAnswer === index && (
                  <div className="w-3 h-3 bg-white rounded-full animate-bounce-gentle" />
                )}
              </div>
              <span className="font-semibold text-lg">{String.fromCharCode(65 + index)}.</span>
              <span className="ml-3 text-lg leading-relaxed">{option}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
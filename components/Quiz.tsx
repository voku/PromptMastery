import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { Button } from './ui/Button';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

export const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleOptionSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    const isCorrect = selectedOption === currentQuestion.correctIndex;
    if (isCorrect) {
      setScore(s => s + 1);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setIsCompleted(true);
      const finalScore = Math.round(((score + (selectedOption === currentQuestion.correctIndex ? 0 : 0)) / questions.length) * 100);
      // Logic fix: score is already updated for previous Qs. Need to account for current one if just submitted?
      // Actually simpler: standard pattern.
      onComplete(finalScore); 
    }
  };
  
  // Re-calculate score properly for the completion screen
  const finalPercent = Math.round((score / questions.length) * 100);

  if (isCompleted) {
    return (
      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
        <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300">
          <CheckCircle size={32} />
        </div>
        <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Quiz Completed!</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">You scored {finalPercent}%</p>
        <Button onClick={() => {
            setIsCompleted(false);
            setCurrentIndex(0);
            setScore(0);
            setSelectedOption(null);
            setShowExplanation(false);
        }}>Retry Quiz</Button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
          <HelpCircle className="text-brand-500" size={20} />
          Knowledge Check
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Question {currentIndex + 1} of {questions.length}
        </span>
      </div>

      <div className="mb-6">
        <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">{currentQuestion.question}</p>
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            let itemClass = "w-full text-left p-4 rounded-lg border transition-all ";
            
            if (showExplanation) {
              if (idx === currentQuestion.correctIndex) {
                itemClass += "bg-green-50 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-300";
              } else if (idx === selectedOption) {
                itemClass += "bg-red-50 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-300";
              } else {
                 itemClass += "border-gray-200 dark:border-gray-700 opacity-50";
              }
            } else {
               if (selectedOption === idx) {
                 itemClass += "border-brand-500 bg-brand-50 dark:bg-brand-900/20 ring-1 ring-brand-500";
               } else {
                 itemClass += "border-gray-200 dark:border-gray-700 hover:border-brand-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800";
               }
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                disabled={showExplanation}
                className={itemClass}
              >
                <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                        showExplanation && idx === currentQuestion.correctIndex ? 'border-green-500 bg-green-500 text-white' :
                        showExplanation && idx === selectedOption && idx !== currentQuestion.correctIndex ? 'border-red-500 bg-red-500 text-white' :
                        selectedOption === idx ? 'border-brand-500 bg-brand-500 text-white' : 
                        'border-gray-400 dark:border-gray-500'
                    }`}>
                        {showExplanation && idx === currentQuestion.correctIndex ? <CheckCircle size={14}/> :
                         showExplanation && idx === selectedOption ? <XCircle size={14}/> :
                         String.fromCharCode(65 + idx)}
                    </div>
                    {option}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {showExplanation && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-800 dark:text-blue-200 text-sm animate-fade-in">
          <strong>Explanation: </strong> {currentQuestion.explanation}
        </div>
      )}

      <div className="flex justify-end">
        {!showExplanation ? (
          <Button onClick={handleSubmit} disabled={selectedOption === null}>Check Answer</Button>
        ) : (
          <Button onClick={handleNext}>{currentIndex === questions.length - 1 ? 'Finish' : 'Next Question'}</Button>
        )}
      </div>
    </div>
  );
};
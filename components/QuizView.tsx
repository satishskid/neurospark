
import React, { useState } from 'react';
import { QuizData } from '../types';
import { CheckCircleIcon, XCircleIcon, TrophyIcon } from './Icons';

interface QuizViewProps {
  quiz: QuizData;
  onComplete: () => void;
}

const QuizView: React.FC<QuizViewProps> = ({ quiz, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCurrentQuestionIndex(i => i + 1);
  };
  
  const hasQuestions = quiz && quiz.questions && quiz.questions.length > 0;

  if (!hasQuestions || currentQuestionIndex >= quiz.questions.length) {
      return (
          <div className="text-center p-8 bg-slate-800/80 rounded-xl border border-slate-700 animate-fade-in">
              <TrophyIcon className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h2>
              <p className="text-slate-300 text-lg mb-6">You scored <strong className="text-white">{score} out of {quiz.questions.length}</strong>. Fantastic work!</p>
              <button
                  onClick={onComplete}
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full transition-colors"
              >
                  Continue
              </button>
          </div>
      );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const handleSelectAnswer = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);
    if (option === currentQuestion.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  return (
    <div className="p-6 bg-slate-800/80 rounded-xl shadow-lg border border-slate-700">
      <p className="text-sm font-semibold text-cyan-400 mb-2">Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
      <h3 className="text-xl font-semibold text-white mb-6">
        {currentQuestion.question}
      </h3>
      <div className="space-y-3">
        {currentQuestion.options.map(option => {
          const isSelected = selectedAnswer === option;
          let buttonClass = 'w-full text-left p-4 rounded-lg transition-all duration-300 border-2 text-slate-200 ';
          
          if (isAnswered) {
             if (option === currentQuestion.correctAnswer) {
                 buttonClass += 'bg-green-500/20 border-green-500 animate-pulse-once';
             } else if (isSelected && !isCorrect) {
                 buttonClass += 'bg-red-500/20 border-red-500';
             } else {
                 buttonClass += 'bg-slate-700/50 border-transparent opacity-50';
             }
          } else {
              buttonClass += 'bg-slate-700 border-slate-600 hover:bg-slate-600 hover:border-cyan-500';
          }
           if (isSelected) {
               buttonClass += ' ring-2 ring-cyan-400';
           }

          return (
            <button key={option} onClick={() => handleSelectAnswer(option)} disabled={isAnswered} className={buttonClass}>
              {option}
            </button>
          );
        })}
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        {isAnswered ? (
          <div className={`flex items-center gap-2 font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'} animate-fade-in`}>
              {isCorrect ? <CheckCircleIcon className="w-6 h-6" /> : <XCircleIcon className="w-6 h-6" />}
              <span className="text-sm">{isCorrect ? "Correct!" : "Not quite, the right answer is highlighted."}</span>
          </div>
        ) : (
          <div className="text-sm text-slate-400 italic">Select an answer to proceed</div>
        )}
        <button 
          onClick={handleNext}
          disabled={!isAnswered}
          className={`font-bold py-2 px-6 rounded-lg transition-all duration-300 ${
            !isAnswered 
              ? 'bg-slate-700 text-slate-500 border border-slate-600/50 cursor-not-allowed opacity-50' 
              : 'bg-slate-600 hover:bg-slate-500 text-white cursor-pointer active:scale-95'
          }`}
        >
          {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

export default QuizView;

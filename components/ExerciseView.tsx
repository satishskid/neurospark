
import React, { useState } from 'react';
import { ExerciseData } from '../types';
import { evaluateExercise } from '../services/aiService';
import { LightBulbIcon, CheckCircleIcon, TrophyIcon } from './Icons';

interface ExerciseViewProps {
  exercise: ExerciseData;
  onComplete: () => void;
}

const ExerciseView: React.FC<ExerciseViewProps> = ({ exercise, onComplete }) => {
  const [userInput, setUserInput] = useState(exercise.initialCode || '');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    setFeedback(null);
    setIsCorrect(null);
    try {
        const result = await evaluateExercise(exercise.evaluationPrompt, userInput);
        setFeedback(result.feedback);
        setIsCorrect(result.isCorrect);
    } catch(e) {
        setFeedback("An unexpected error occurred. Please try again.");
        setIsCorrect(false);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-slate-800/80 rounded-xl shadow-lg border border-slate-700">
      <div className="prose prose-invert max-w-none text-slate-300 prose-strong:text-yellow-400 prose-code:bg-slate-700 prose-code:p-1 prose-code:rounded">
        {exercise.prompt}
      </div>

      <div className="mt-6">
        <label htmlFor="userInput" className="block text-sm font-medium text-slate-400 mb-2">Your Answer:</label>
        <textarea
          id="userInput"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="w-full h-40 p-3 font-mono text-sm bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
          placeholder="Type your answer here..."
        />
      </div>

      <div className="mt-6 flex justify-end items-center gap-4">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[150px]"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Thinking...
            </>
          ) : 'Check My Work'}
        </button>
      </div>

      {feedback && (
        <div className={`mt-6 p-4 rounded-lg flex gap-4 animate-fade-in ${isCorrect ? 'bg-green-500/10' : 'bg-yellow-500/10'} border ${isCorrect ? 'border-green-500/30' : 'border-yellow-500/30'}`}>
            <LightBulbIcon className={`w-8 h-8 flex-shrink-0 ${isCorrect ? 'text-green-400' : 'text-yellow-400'}`} />
            <div>
              <h4 className="font-bold text-lg text-white mb-1">AI Tutor Feedback</h4>
              <p className="text-slate-300">{feedback}</p>
            </div>
        </div>
      )}

      {isCorrect === true && (
         <div className="mt-6 p-6 bg-green-900/50 rounded-lg text-center border border-green-700 animate-fade-in">
            <CheckCircleIcon className="w-12 h-12 text-green-300 mx-auto mb-2" />
            <h3 className="text-xl font-bold text-white">Excellent Work!</h3>
            <p className="text-green-200 mb-4">You've mastered this concept. Let's keep the momentum going!</p>
            <button
              onClick={onComplete}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              <TrophyIcon className="w-5 h-5" />
              Continue
            </button>
        </div>
      )}
    </div>
  );
};

export default ExerciseView;

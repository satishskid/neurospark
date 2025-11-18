import { useState } from 'react';
import { ExerciseData } from '../types';
import { evaluateExercise } from '../services/aiService';
import { LightBulbIcon, CheckCircleIcon, TrophyIcon, ChatBubbleLeftRightIcon } from './Icons';

interface ExerciseViewProps {
  exercise: ExerciseData;
  onComplete: () => void;
}

const ExerciseView: React.FC<ExerciseViewProps> = ({ exercise, onComplete }) => {
  const [userInput, setUserInput] = useState(exercise.initialCode || '');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [showExampleSolution, setShowExampleSolution] = useState(false);
  const [attemptHistory, setAttemptHistory] = useState<Array<{attempt: number, input: string, feedback: string}>>([]);

  const MAX_ATTEMPTS = 3;

  const handleSubmit = async () => {
    setIsLoading(true);
    setFeedback(null);
    setIsCorrect(null);
    
    try {
        const result = await evaluateExercise(exercise.evaluationPrompt, userInput);
        const newAttemptCount = attemptCount + 1;
        
        setFeedback(result.feedback);
        setIsCorrect(result.isCorrect);
        setAttemptCount(newAttemptCount);
        
        // Record attempt
        setAttemptHistory(prev => [...prev, {
          attempt: newAttemptCount,
          input: userInput,
          feedback: result.feedback
        }]);

        // Show example solution after 3 failed attempts
        if (!result.isCorrect && newAttemptCount >= MAX_ATTEMPTS) {
          setShowExampleSolution(true);
        }
    } catch(e) {
        setFeedback("An unexpected error occurred. Please try again.");
        setIsCorrect(false);
    } finally {
        setIsLoading(false);
    }
  };

  const handleReset = () => {
    setUserInput(exercise.initialCode || '');
    setFeedback(null);
    setIsCorrect(null);
    setAttemptCount(0);
    setShowExampleSolution(false);
    setAttemptHistory([]);
  };

  // Generate example solution based on exercise type
  const getExampleSolution = () => {
    // This would ideally come from the exercise data
    // For now, we'll provide a generic helpful response
    return {
      title: "Example Approach",
      solution: "Here's one way to approach this exercise:\n\n" + 
                "1. Read the requirements carefully\n" +
                "2. Break down the problem into smaller steps\n" +
                "3. Address each requirement systematically\n" +
                "4. Review your answer for completeness\n\n" +
                "Key principles to remember:\n" +
                "• Be specific and clear\n" +
                "• Use proper formatting\n" +
                "• Include all required elements",
      hint: "Try focusing on the core concepts we covered in this lesson."
    };
  };

  const exampleSolution = getExampleSolution();

  return (
    <div className="space-y-4">
      {/* Exercise Prompt */}
      <div className="p-6 bg-slate-800/80 rounded-xl shadow-lg border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">✏️ Practice Exercise</h3>
          {attemptCount > 0 && (
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${
                attemptCount >= MAX_ATTEMPTS ? 'text-red-400' : 'text-cyan-400'
              }`}>
                Attempt {attemptCount}/{MAX_ATTEMPTS}
              </span>
              {attemptCount < MAX_ATTEMPTS && !isCorrect && (
                <button
                  onClick={handleReset}
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Reset
                </button>
              )}
            </div>
          )}
        </div>

        <div className="prose prose-invert max-w-none text-slate-300 prose-strong:text-yellow-400 prose-code:bg-slate-700 prose-code:p-1 prose-code:rounded mb-6">
          {exercise.prompt}
        </div>

        <div className="mt-6">
          <label htmlFor="userInput" className="block text-sm font-medium text-slate-400 mb-2">
            Your Answer:
          </label>
          <textarea
            id="userInput"
            value={userInput}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setUserInput(e.target.value)}
            disabled={isCorrect === true || (attemptCount >= MAX_ATTEMPTS && !isCorrect)}
            className="w-full h-40 p-3 font-mono text-sm bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Type your answer here..."
          />
        </div>

        <div className="mt-6 flex justify-between items-center gap-4">
          <div className="text-sm text-slate-400">
            {attemptCount === 0 && "Take your time and think through your answer"}
            {attemptCount === 1 && !isCorrect && "Good try! Review the feedback and try again"}
            {attemptCount === 2 && !isCorrect && "You're close! One more attempt"}
            {attemptCount >= MAX_ATTEMPTS && !isCorrect && "See the example solution below"}
          </div>
          <button
            onClick={handleSubmit}
            disabled={isLoading || isCorrect === true || attemptCount >= MAX_ATTEMPTS}
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
      </div>

      {/* AI Feedback */}
      {feedback && (
        <div className={`p-4 rounded-lg flex gap-4 animate-fade-in ${
          isCorrect ? 'bg-green-500/10 border border-green-500/30' : 'bg-yellow-500/10 border border-yellow-500/30'
        }`}>
            <LightBulbIcon className={`w-8 h-8 flex-shrink-0 ${isCorrect ? 'text-green-400' : 'text-yellow-400'}`} />
            <div className="flex-1">
              <h4 className="font-bold text-lg text-white mb-1">
                {isCorrect ? '✓ Excellent!' : `Attempt ${attemptCount}/${MAX_ATTEMPTS}`}
              </h4>
              <p className="text-slate-300">{feedback}</p>
              
              {!isCorrect && attemptCount < MAX_ATTEMPTS && (
                <p className="text-slate-400 text-sm mt-2">
                  💡 Tip: Review the feedback above and try modifying your answer.
                </p>
              )}
            </div>
        </div>
      )}

      {/* Example Solution (after 3 attempts) */}
      {showExampleSolution && !isCorrect && (
        <div className="p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <LightBulbIcon className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-white mb-2">💡 {exampleSolution.title}</h4>
              <p className="text-slate-300 mb-4">
                You've given this a great effort! Here's guidance to help you understand the concept:
              </p>
              
              <div className="bg-slate-800/50 rounded-lg p-4 mb-4">
                <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono">
                  {exampleSolution.solution}
                </pre>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 mb-4">
                <p className="text-cyan-400 font-semibold mb-2">💭 Key Insight:</p>
                <p className="text-slate-300 text-sm">{exampleSolution.hint}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="bg-slate-600 hover:bg-slate-500 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  Try Again
                </button>
                <button
                  onClick={onComplete}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm flex items-center gap-2"
                >
                  <ChatBubbleLeftRightIcon className="w-4 h-4" />
                  Ask AI Tutor
                </button>
                <button
                  onClick={onComplete}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  Mark Complete & Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success State */}
      {isCorrect === true && (
         <div className="p-6 bg-green-900/50 rounded-lg text-center border border-green-700 animate-fade-in">
            <CheckCircleIcon className="w-12 h-12 text-green-300 mx-auto mb-2" />
            <h3 className="text-xl font-bold text-white">Excellent Work!</h3>
            <p className="text-green-200 mb-2">
              You've mastered this concept{attemptCount > 1 ? ` in ${attemptCount} attempts` : ' on your first try'}!
            </p>
            <p className="text-green-300 text-sm mb-4">Let's keep the momentum going!</p>
            <button
              onClick={onComplete}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              <TrophyIcon className="w-5 h-5" />
              Continue to Next Lesson
            </button>
        </div>
      )}

      {/* Attempt History (collapsible) */}
      {attemptHistory.length > 1 && (
        <details className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <summary className="cursor-pointer text-slate-400 hover:text-white transition-colors font-medium">
            📝 View Attempt History ({attemptHistory.length} attempts)
          </summary>
          <div className="mt-4 space-y-3">
            {attemptHistory.map((attempt, idx) => (
              <div key={idx} className="p-3 bg-slate-900/50 rounded border border-slate-700">
                <p className="text-sm text-slate-400 mb-1">Attempt {attempt.attempt}</p>
                <p className="text-slate-300 text-sm mb-2 font-mono bg-slate-800 p-2 rounded">
                  {attempt.input.substring(0, 100)}{attempt.input.length > 100 ? '...' : ''}
                </p>
                <p className="text-slate-400 text-xs italic">{attempt.feedback}</p>
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
};

export default ExerciseView;

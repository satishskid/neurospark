import { useState } from 'react';
import { QuizData, QuizMode } from '../types';
import { CheckCircleIcon, XCircleIcon, TrophyIcon, LightBulbIcon } from './Icons';

interface QuizViewProps {
  quiz: QuizData;
  onComplete: () => void;
}

const QuizView: React.FC<QuizViewProps> = ({ quiz, onComplete }) => {
  const [mode, setMode] = useState<QuizMode>('study');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<Record<number, string[]>>({});
  const [showHint, setShowHint] = useState(false);
  const [allAnswers, setAllAnswers] = useState<Array<{question: number, selected: string, correct: string, isCorrect: boolean}>>([]);

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setAttemptCount(0);
    setShowHint(false);
    setCurrentQuestionIndex(i => i + 1);
  };
  
  const hasQuestions = quiz && quiz.questions && quiz.questions.length > 0;

  if (!hasQuestions || currentQuestionIndex >= quiz.questions.length) {
      const percentage = quiz.questions.length > 0 ? Math.round((score / quiz.questions.length) * 100) : 0;
      const passed = percentage >= 75;

      return (
          <div className="text-center p-8 bg-slate-800/80 rounded-xl border border-slate-700 animate-fade-in">
              <TrophyIcon className={`w-16 h-16 mx-auto mb-4 ${passed ? 'text-yellow-400' : 'text-slate-400'}`} />
              <h2 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h2>
              <p className="text-slate-300 text-lg mb-2">
                You scored <strong className="text-white">{score}</strong> out of <strong className="text-white">{quiz.questions.length}</strong>
              </p>
              <p className={`text-2xl font-bold mb-6 ${passed ? 'text-green-400' : 'text-yellow-400'}`}>
                {percentage}% {passed ? '- Great job!' : '- Keep practicing!'}
              </p>

              {/* Show review of answers in Study mode */}
              {mode === 'study' && allAnswers.length > 0 && (
                <div className="mb-6 text-left max-w-2xl mx-auto">
                  <h3 className="text-lg font-bold text-white mb-3">📝 Answer Review</h3>
                  <div className="space-y-3">
                    {allAnswers.map((answer, idx) => (
                      <div key={idx} className={`p-3 rounded-lg border ${
                        answer.isCorrect 
                          ? 'bg-green-500/10 border-green-500/30' 
                          : 'bg-red-500/10 border-red-500/30'
                      }`}>
                        <p className="text-sm text-slate-400 mb-1">Question {answer.question + 1}</p>
                        <p className="text-white font-medium mb-1">{quiz.questions[answer.question].question}</p>
                        {answer.isCorrect ? (
                          <p className="text-green-400 text-sm">✓ Your answer: {answer.selected}</p>
                        ) : (
                          <>
                            <p className="text-red-400 text-sm">✗ Your answer: {answer.selected}</p>
                            <p className="text-green-400 text-sm">✓ Correct answer: {answer.correct}</p>
                            {quiz.questions[answer.question].explanation && (
                              <p className="text-slate-300 text-sm mt-2 italic">
                                {quiz.questions[answer.question].explanation}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 justify-center">
                {!passed && mode === 'test' && (
                  <button
                    onClick={() => {
                      setCurrentQuestionIndex(0);
                      setScore(0);
                      setAllAnswers([]);
                      setWrongAnswers({});
                    }}
                    className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-8 rounded-full transition-colors"
                  >
                    Retry Quiz
                  </button>
                )}
                <button
                    onClick={onComplete}
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full transition-colors"
                >
                    Continue to Next Lesson
                </button>
              </div>
          </div>
      );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const maxAttempts = currentQuestion.maxAttempts || 3;

  const handleSelectAnswer = (option: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(option);
    setAttemptCount(prev => prev + 1);
    
    const correct = option === currentQuestion.correctAnswer;
    
    // Record answer
    setAllAnswers(prev => [...prev, {
      question: currentQuestionIndex,
      selected: option,
      correct: currentQuestion.correctAnswer,
      isCorrect: correct
    }]);

    if (correct) {
      setScore(s => s + 1);
      setIsAnswered(true);
    } else {
      // Track wrong answers
      setWrongAnswers(prev => ({
        ...prev,
        [currentQuestionIndex]: [...(prev[currentQuestionIndex] || []), option]
      }));

      // In study mode, allow retries with hints
      if (mode === 'study') {
        if (attemptCount + 1 >= maxAttempts) {
          setIsAnswered(true);
        } else {
          // Show hint after wrong answer
          setShowHint(true);
          setTimeout(() => {
            setSelectedAnswer(null);
            setShowHint(false);
          }, 3000);
        }
      } else {
        // In test mode, lock answer immediately
        setIsAnswered(true);
      }
    }
  };

  // Generate adaptive hints based on attempt count
  const getHint = () => {
    if (attemptCount === 1) {
      // Tier 1: Gentle nudge
      return "💡 Think carefully about the key concepts we covered. Try again!";
    } else if (attemptCount === 2) {
      // Tier 2: Conceptual hint
      if (currentQuestion.explanation) {
        return `💡 Hint: ${currentQuestion.explanation.substring(0, 100)}...`;
      }
      return "💡 Consider the fundamental principles. You're close!";
    } else {
      // Tier 3: Educational redirect
      return "💡 Let's review this concept. The correct answer is highlighted.";
    }
  };

  return (
    <div className="space-y-4">
      {/* Mode Toggle */}
      {currentQuestionIndex === 0 && !isAnswered && (
        <div className="flex items-center justify-between p-4 bg-slate-800/80 rounded-xl border border-slate-700">
          <div>
            <p className="text-white font-semibold">Quiz Mode</p>
            <p className="text-slate-400 text-sm">
              {mode === 'study' ? 'Practice with hints and unlimited retries' : 'Test your knowledge (3 attempts max)'}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setMode('study')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                mode === 'study'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
              }`}
            >
              Study Mode
            </button>
            <button
              onClick={() => setMode('test')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                mode === 'test'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
              }`}
            >
              Test Mode
            </button>
          </div>
        </div>
      )}

      {/* Question */}
      <div className="p-6 bg-slate-800/80 rounded-xl shadow-lg border border-slate-700">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-cyan-400">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </p>
          {mode === 'study' && attemptCount > 0 && !isAnswered && (
            <p className="text-sm text-yellow-400">
              Attempt {attemptCount}/{maxAttempts}
            </p>
          )}
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-6">
          {currentQuestion.question}
        </h3>
        
        <div className="space-y-3">
          {currentQuestion.options.map(option => {
            const isSelected = selectedAnswer === option;
            const wasWrong = wrongAnswers[currentQuestionIndex]?.includes(option);
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
                if (wasWrong) {
                  buttonClass += 'bg-slate-700/30 border-slate-600 opacity-50';
                } else {
                  buttonClass += 'bg-slate-700 border-slate-600 hover:bg-slate-600 hover:border-cyan-500';
                }
            }
             if (isSelected && !isAnswered) {
                 buttonClass += ' ring-2 ring-cyan-400';
             }

            return (
              <button 
                key={option} 
                onClick={() => handleSelectAnswer(option)} 
                disabled={isAnswered || wasWrong} 
                className={buttonClass}
              >
                {option}
              </button>
            );
          })}
        </div>
        
        {/* Hint Display */}
        {showHint && mode === 'study' && !isAnswered && (
          <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg animate-fade-in">
            <div className="flex items-start gap-3">
              <LightBulbIcon className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-yellow-400 font-semibold mb-1">Hint</p>
                <p className="text-slate-300 text-sm">{getHint()}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Feedback */}
        {isAnswered && (
          <div className="mt-6 p-4 rounded-lg flex justify-between items-center animate-fade-in" style={{backgroundColor: isCorrect ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'}}>
              <div className={`flex items-center gap-2 font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                  {isCorrect ? <CheckCircleIcon className="w-6 h-6" /> : <XCircleIcon className="w-6 h-6" />}
                  <div>
                    <p>{isCorrect ? "Correct!" : "Not quite, the right answer is highlighted."}</p>
                    {!isCorrect && currentQuestion.explanation && (
                      <p className="text-slate-300 text-sm mt-1 font-normal">{currentQuestion.explanation}</p>
                    )}
                  </div>
              </div>
              <button 
                onClick={handleNext}
                className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-6 rounded-lg transition-colors"
              >
                Next
              </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizView;

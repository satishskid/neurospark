/**
 * Interactive Quiz Component for Self-Assessment
 */

import React, { useState } from 'react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category?: string;
}

interface ScenarioQuestion {
  id: string;
  scenario: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  clinicalPearl?: string;
}

export const InteractiveQuiz = ({ questions, title }: {
  questions: QuizQuestion[];
  title: string;
}) => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    return { correct, total: questions.length, percentage: Math.round((correct / questions.length) * 100) };
  };

  const score = showResults ? calculateScore() : null;

  return (
    <div className="my-8 p-6 bg-white border-2 border-blue-300 rounded-xl">
      <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-3xl">📝</span>
        {title}
      </h3>

      {!showResults ? (
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div key={q.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                <p className="text-gray-900 font-medium flex-1">{q.question}</p>
              </div>
              <div className="space-y-2 ml-11">
                {q.options.map((option, oIdx) => (
                  <label
                    key={oIdx}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      answers[q.id] === oIdx
                        ? 'bg-blue-100 border-2 border-blue-600'
                        : 'bg-white border-2 border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      checked={answers[q.id] === oIdx}
                      onChange={() => handleAnswer(q.id, oIdx)}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-800">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={() => setShowResults(true)}
            disabled={Object.keys(answers).length !== questions.length}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors"
          >
            Submit Answers
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Score Summary */}
          <div className={`p-6 rounded-xl border-2 ${
            score!.percentage >= 80 ? 'bg-green-50 border-green-600' :
            score!.percentage >= 60 ? 'bg-yellow-50 border-yellow-600' :
            'bg-red-50 border-red-600'
          }`}>
            <h4 className="text-2xl font-bold mb-2">
              Your Score: {score!.correct}/{score!.total} ({score!.percentage}%)
            </h4>
            <p className="text-gray-700">
              {score!.percentage >= 80 ? '🎉 Excellent! You have a strong understanding of this material.' :
               score!.percentage >= 60 ? '👍 Good job! Review the explanations below to strengthen your knowledge.' :
               '📚 Keep learning! Review the material and try again.'}
            </p>
          </div>

          {/* Detailed Results */}
          {questions.map((q, idx) => {
            const userAnswer = answers[q.id];
            const isCorrect = userAnswer === q.correctAnswer;
            return (
              <div key={q.id} className={`p-4 rounded-lg border-2 ${
                isCorrect ? 'bg-green-50 border-green-600' : 'bg-red-50 border-red-600'
              }`}>
                <div className="flex items-start gap-3 mb-3">
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                    isCorrect ? 'bg-green-600' : 'bg-red-600'
                  }`}>
                    {isCorrect ? '✓' : '✗'}
                  </span>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium mb-2">{q.question}</p>
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>Your answer:</strong> {q.options[userAnswer]}
                    </p>
                    {!isCorrect && (
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Correct answer:</strong> {q.options[q.correctAnswer]}
                      </p>
                    )}
                    <div className="mt-3 p-3 bg-white rounded border border-gray-300">
                      <p className="text-sm text-gray-800"><strong>Explanation:</strong> {q.explanation}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <button
            onClick={() => { setAnswers({}); setShowResults(false); }}
            className="w-full px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
          >
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export const ScenarioQuiz = ({ scenarios, title }: {
  scenarios: ScenarioQuestion[];
  title: string;
}) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const scenario = scenarios[currentScenario];

  const handleNext = () => {
    setCurrentScenario(prev => Math.min(prev + 1, scenarios.length - 1));
    setAnswer(null);
    setShowExplanation(false);
  };

  const handlePrevious = () => {
    setCurrentScenario(prev => Math.max(prev - 1, 0));
    setAnswer(null);
    setShowExplanation(false);
  };

  return (
    <div className="my-8 p-6 bg-white border-2 border-purple-300 rounded-xl">
      <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-3xl">🏥</span>
        {title}
      </h3>

      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-gray-600">
          Scenario {currentScenario + 1} of {scenarios.length}
        </span>
        <div className="flex gap-2">
          {scenarios.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full ${
                idx === currentScenario ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Clinical Scenario */}
      <div className="p-4 bg-purple-50 rounded-lg border border-purple-300 mb-6">
        <h4 className="font-semibold text-purple-900 mb-2">Clinical Scenario</h4>
        <p className="text-gray-800 leading-relaxed whitespace-pre-line">{scenario.scenario}</p>
      </div>

      {/* Question */}
      <div className="mb-6">
        <p className="text-lg font-medium text-gray-900 mb-4">{scenario.question}</p>
        <div className="space-y-2">
          {scenario.options.map((option, idx) => (
            <label
              key={idx}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                answer === idx
                  ? showExplanation
                    ? idx === scenario.correctAnswer
                      ? 'bg-green-100 border-2 border-green-600'
                      : 'bg-red-100 border-2 border-red-600'
                    : 'bg-purple-100 border-2 border-purple-600'
                  : 'bg-white border-2 border-gray-300 hover:border-purple-400'
              }`}
            >
              <input
                type="radio"
                name="scenario-answer"
                checked={answer === idx}
                onChange={() => { setAnswer(idx); setShowExplanation(false); }}
                disabled={showExplanation}
                className="w-4 h-4"
              />
              <span className="text-gray-800">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit/Explanation */}
      {!showExplanation && answer !== null && (
        <button
          onClick={() => setShowExplanation(true)}
          className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors mb-4"
        >
          Check Answer
        </button>
      )}

      {showExplanation && (
        <div className={`p-4 rounded-lg border-2 mb-4 ${
          answer === scenario.correctAnswer
            ? 'bg-green-50 border-green-600'
            : 'bg-red-50 border-red-600'
        }`}>
          <h4 className="font-semibold text-gray-900 mb-2">
            {answer === scenario.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
          </h4>
          <p className="text-gray-800 mb-3">{scenario.explanation}</p>
          {scenario.clinicalPearl && (
            <div className="p-3 bg-white rounded border border-gray-300">
              <p className="text-sm text-gray-800">
                <strong className="text-purple-700">💎 Clinical Pearl:</strong> {scenario.clinicalPearl}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={handlePrevious}
          disabled={currentScenario === 0}
          className="px-6 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors"
        >
          ← Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentScenario === scenarios.length - 1}
          className="flex-1 px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors"
        >
          Next Scenario →
        </button>
      </div>
    </div>
  );
};


import React from 'react';
import { SparklesIcon } from './Icons';

interface TutorialViewProps {
  onComplete: () => void;
}

const FeatureHighlight = ({ title, description, position }: { title: string, description: string, position: string }) => (
  <div className={`absolute p-6 bg-slate-800 rounded-lg shadow-2xl border border-slate-700 max-w-xs transition-all duration-500 animate-fade-in ${position}`}>
    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg blur opacity-30"></div>
    <div className="relative">
      <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
      <p className="text-slate-300 text-sm">{description}</p>
    </div>
  </div>
);


export const TutorialView: React.FC<TutorialViewProps> = ({ onComplete }) => {
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex flex-col justify-center items-center p-4">
      
      {/* Feature Explanations */}
      <div className="relative w-full h-full max-w-6xl max-h-[80vh]">
        {/* These positions are designed for a typical large screen layout */}
        <FeatureHighlight 
          title="Your Journey Map" 
          description="This is the curriculum. It shows all the modules and lessons in your journey. Click any unlocked lesson to jump right to it."
          position="top-20 left-4"
        />
        <FeatureHighlight 
          title="Track Your Progress" 
          description="Watch your progress bar grow! This header shows how much you've completed and gives you time estimates for the module and the full course."
          position="top-1/4 right-4"
        />
        <FeatureHighlight 
          title="Your Personal AI Tutor" 
          description="Stuck on a concept in a lesson? Click this button anytime to open a chat and ask your AI Tutor for help. It knows what you're studying!"
          position="bottom-8 right-1/4"
        />
      </div>

      {/* Completion Button */}
      <div className="relative z-10 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4">Welcome to Your AI Journey!</h2>
          <p className="text-slate-300 text-lg mb-8">Here’s a quick tour of your learning environment.</p>
          <button
            onClick={onComplete}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-10 rounded-full text-lg transition-all transform hover:scale-105 shadow-2xl shadow-green-500/20"
          >
            <SparklesIcon className="w-6 h-6" />
            Let's Begin!
          </button>
      </div>

    </div>
  );
};

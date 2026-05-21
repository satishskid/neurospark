import React from 'react';
import { LogoIcon, BrainIcon, CodeBracketSquareIcon, CubeTransparentIcon } from './Icons';

interface OnboardingScreenProps {
  onStart: () => void;
}

const ConceptCard = ({ icon, name, className }: { icon: React.ReactNode, name: string, className: string }) => (
    <div className={`flex items-center gap-3 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-lg px-4 py-2 shadow-lg ${className}`}>
        {icon}
        <span className="font-medium text-slate-200">{name}</span>
    </div>
);

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onStart }) => {

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
            <div className="absolute h-64 w-64 bg-cyan-500 rounded-full -top-10 -left-20 mix-blend-lighten filter blur-3xl opacity-40 animate-blob"></div>
            <div className="absolute h-64 w-64 bg-blue-500 rounded-full -bottom-10 -right-20 mix-blend-lighten filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
             <div className="absolute h-64 w-64 bg-purple-500 rounded-full top-20 right-40 mix-blend-lighten filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
        </div>
      <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto flex-grow justify-center">
        <div className="relative h-96 hidden lg:flex items-center justify-center">
             <ConceptCard icon={<BrainIcon className="w-7 h-7 text-cyan-400" />} name="Clinical AI" className="absolute top-10 left-0 animate-float" />
             <ConceptCard icon={<CodeBracketSquareIcon className="w-7 h-7 text-green-400" />} name="RAG & Privacy" className="absolute top-32 right-0 animate-float animation-delay-1000" />
             <ConceptCard icon={<CubeTransparentIcon className="w-7 h-7 text-yellow-400" />} name="Agentic Workflows" className="absolute bottom-20 left-10 animate-float animation-delay-2000" />
             <LogoIcon className="w-40 h-40 text-slate-500" />
        </div>
        <div className="text-center lg:text-left">
            <div className="inline-block lg:hidden p-4 bg-slate-800 rounded-full mb-6">
              <LogoIcon className="w-16 h-16 text-cyan-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tighter">
              Greywaken:<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">The Clinical AI Masterclass</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Stop feeling behind the curve. Master the modern AI ecosystem through the lens of human biology and clinical reasoning. From understanding how LLMs diagnose via Chain-of-Thought, to building Agentic workflows and navigating the frontier of Open-Source models. This is your definitive guide to safely deploying AI in healthcare.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                <button
                  onClick={onStart}
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-cyan-500/20 sm:w-auto flex-shrink-0"
                >
                  Get Started
                </button>
            </div>
        </div>
      </div>
      <footer className="w-full text-center text-xs text-slate-600 py-4 mt-auto flex-shrink-0">
          <p>© {new Date().getFullYear()} GreyWaken by greybrain.ai. Awaken your potential.</p>
      </footer>
    </div>
  );
};

export default OnboardingScreen;
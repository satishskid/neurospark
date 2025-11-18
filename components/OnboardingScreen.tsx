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
             <ConceptCard icon={<BrainIcon className="w-7 h-7 text-cyan-400" />} name="AI Models" className="absolute top-10 left-0 animate-float" />
             <ConceptCard icon={<CodeBracketSquareIcon className="w-7 h-7 text-green-400" />} name="JSON Data" className="absolute top-32 right-0 animate-float animation-delay-1000" />
             <ConceptCard icon={<CubeTransparentIcon className="w-7 h-7 text-yellow-400" />} name="Frontend/Backend" className="absolute bottom-20 left-10 animate-float animation-delay-2000" />
             <LogoIcon className="w-40 h-40 text-slate-500" />
        </div>
        <div className="text-center lg:text-left">
            <div className="inline-block lg:hidden p-4 bg-slate-800 rounded-full mb-6">
              <LogoIcon className="w-16 h-16 text-cyan-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight tracking-tighter">
              Master AI.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Transform Healthcare.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-6 max-w-lg mx-auto lg:mx-0">
              You save lives. Now, let AI save you <span className="text-cyan-400 font-semibold">15+ hours every week</span>.
            </p>
            <p className="text-base md:text-lg text-slate-400 mb-8 max-w-lg mx-auto lg:mx-0">
              This isn&apos;t another tech course. It&apos;s your pathway from <span className="text-white font-medium">overwhelmed clinician to AI-empowered healer</span>. 
              Learn AI through medical analogies you already know. Master HIPAA-compliant workflows. 
              Build your personal AI toolkit in just <span className="text-cyan-400 font-semibold">6 hours</span>.
            </p>
            <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-4 mb-8 max-w-lg mx-auto lg:mx-0">
              <p className="text-sm text-slate-300 mb-2">
                <span className="text-cyan-400 font-bold">✓</span> Designed by doctors, for doctors
              </p>
              <p className="text-sm text-slate-300 mb-2">
                <span className="text-cyan-400 font-bold">✓</span> No coding required
              </p>
              <p className="text-sm text-slate-300">
                <span className="text-cyan-400 font-bold">✓</span> IIHMRB Certified • HIPAA-focused • Immediately applicable
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                <button
                  onClick={onStart}
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-cyan-500/20 sm:w-auto flex-shrink-0"
                >
                  Start Your Journey
                </button>
                <div className="text-sm text-slate-400">
                  <span className="block sm:inline">6 hours • 7 modules • </span>
                  <span className="text-cyan-400 font-semibold">Lifetime impact</span>
                </div>
            </div>
            <p className="text-xs text-slate-500 mt-6 italic max-w-lg mx-auto lg:mx-0">
              "The future of medicine isn&apos;t AI replacing doctors. It&apos;s doctors empowered by AI, delivering care that&apos;s faster, safer, and more human."
            </p>
        </div>
      </div>
      <footer className="w-full text-center text-xs text-slate-600 py-4 mt-auto flex-shrink-0">
          <p>© {new Date().getFullYear()} GreyWaken by greybrain.ai. Awaken your potential.</p>
      </footer>
    </div>
  );
};

export default OnboardingScreen;
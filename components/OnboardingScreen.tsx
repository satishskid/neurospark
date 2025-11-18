import React, { useState, useEffect } from 'react';
import { LogoIcon, BrainIcon, CodeBracketSquareIcon, CubeTransparentIcon } from './Icons';
import PromotionalBanner from './PromotionalBanner';
import { db } from '../services/firebaseService';
import { doc, getDoc } from 'firebase/firestore';

interface OnboardingScreenProps {
  onStart: () => void;
}

interface PromotionalContent {
  message: string;
  type: 'info' | 'success' | 'warning';
  visible: boolean;
}

const ConceptCard = ({ icon, name, className }: { icon: React.ReactNode, name: string, className: string }) => (
    <div className={`flex items-center gap-3 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-lg px-4 py-2 shadow-lg ${className}`}>
        {icon}
        <span className="font-medium text-slate-200">{name}</span>
    </div>
);

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onStart }) => {
  const [promoContent, setPromoContent] = useState<PromotionalContent | null>(null);

  useEffect(() => {
    const loadPromoContent = async () => {
      try {
        const docRef = doc(db, 'settings', 'promotional');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setPromoContent(docSnap.data() as PromotionalContent);
        }
      } catch (error) {
        console.error('Error loading promotional content:', error);
      }
    };

    loadPromoContent();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
            <div className="absolute h-64 w-64 bg-cyan-500 rounded-full -top-10 -left-20 mix-blend-lighten filter blur-3xl opacity-40 animate-blob"></div>
            <div className="absolute h-64 w-64 bg-blue-500 rounded-full -bottom-10 -right-20 mix-blend-lighten filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
             <div className="absolute h-64 w-64 bg-purple-500 rounded-full top-20 right-40 mix-blend-lighten filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
        </div>
      <div className="relative z-10 w-full max-w-6xl mx-auto flex-grow flex flex-col justify-center">
        {/* Promotional Banner */}
        {promoContent && promoContent.visible && (
          <PromotionalBanner 
            message={promoContent.message}
            type={promoContent.type}
            visible={promoContent.visible}
          />
        )}
        
        <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div className="relative h-96 hidden lg:flex items-center justify-center">
             {/* AI Models */}
             <ConceptCard icon={<BrainIcon className="w-6 h-6 text-cyan-400" />} name="ChatGPT" className="absolute top-8 left-5 animate-float text-sm" />
             <ConceptCard icon={<BrainIcon className="w-6 h-6 text-blue-400" />} name="Gemini" className="absolute top-24 left-0 animate-float animation-delay-1000 text-sm" />
             <ConceptCard icon={<BrainIcon className="w-6 h-6 text-purple-400" />} name="Claude" className="absolute top-40 left-8 animate-float animation-delay-2000 text-sm" />
             
             {/* Medical AI */}
             <ConceptCard icon={<BrainIcon className="w-6 h-6 text-green-400" />} name="Med-PaLM" className="absolute top-12 right-2 animate-float animation-delay-500 text-sm" />
             <ConceptCard icon={<BrainIcon className="w-6 h-6 text-emerald-400" />} name="BioGPT" className="absolute top-36 right-0 animate-float animation-delay-1500 text-sm" />
             
             {/* AI Jargon */}
             <ConceptCard icon={<CodeBracketSquareIcon className="w-6 h-6 text-yellow-400" />} name="Tokens" className="absolute bottom-32 left-2 animate-float animation-delay-3000 text-sm" />
             <ConceptCard icon={<CodeBracketSquareIcon className="w-6 h-6 text-orange-400" />} name="Context Window" className="absolute bottom-16 left-12 animate-float animation-delay-3500 text-sm" />
             <ConceptCard icon={<CubeTransparentIcon className="w-6 h-6 text-pink-400" />} name="Parameters" className="absolute bottom-24 right-8 animate-float animation-delay-2500 text-sm" />
             <ConceptCard icon={<CubeTransparentIcon className="w-6 h-6 text-rose-400" />} name="Fine-tuning" className="absolute bottom-8 right-0 animate-float animation-delay-4000 text-sm" />
             
             {/* Center Logo */}
             <LogoIcon className="w-32 h-32 text-slate-500" />
        </div>
        <div className="text-center lg:text-left">
            <div className="inline-block lg:hidden p-4 bg-slate-800 rounded-full mb-6">
              <LogoIcon className="w-16 h-16 text-cyan-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight tracking-tighter">
              From AI Curious to<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">AI Confident</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-6 max-w-lg mx-auto lg:mx-0">
              The <span className="text-cyan-400 font-semibold">only AI course</span> designed by clinical AI scientists, 
              personalized to <span className="text-white font-medium">your level</span>, with an AI tutor by your side.
            </p>
            <p className="text-base md:text-lg text-slate-400 mb-8 max-w-lg mx-auto lg:mx-0">
              Whether you&apos;re a complete beginner or tech-savvy professional, this course adapts to you. 
              Learn through <span className="text-cyan-400">real medical scenarios</span>, get instant feedback, 
              and master AI in <span className="text-white font-medium">6 personalized hours</span>.
            </p>
            <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-4 mb-8 max-w-lg mx-auto lg:mx-0">
              <p className="text-sm text-slate-300 mb-2">
                <span className="text-cyan-400 font-bold">🧬</span> Created by Clinical AI Scientists
              </p>
              <p className="text-sm text-slate-300 mb-2">
                <span className="text-cyan-400 font-bold">🎯</span> Personalized to Your Level
              </p>
              <p className="text-sm text-slate-300 mb-2">
                <span className="text-cyan-400 font-bold">🤖</span> AI Tutor Guides You 24/7
              </p>
              <p className="text-sm text-slate-300">
                <span className="text-cyan-400 font-bold">💼</span> Real Medical Use Cases • IIHMRB Certified
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                <button
                  onClick={onStart}
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-cyan-500/20 sm:w-auto flex-shrink-0"
                >
                  Begin Learning
                </button>
                <button
                  onClick={() => window.open('https://t.me/greybrainsoai', '_blank')}
                  className="bg-slate-800 hover:bg-slate-700 border-2 border-cyan-400 text-cyan-400 font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 sm:w-auto flex-shrink-0"
                >
                  Join AI School
                </button>
            </div>
            <div className="text-sm text-slate-400 mt-4 text-center lg:text-left space-y-2">
              <div>
                <span className="block sm:inline">Adaptive • Interactive • </span>
                <span className="text-cyan-400 font-semibold">Personalized</span>
              </div>
              <p className="text-xs text-slate-500">
                📱 Join our <span className="text-cyan-400">AI School</span> Telegram channel for updates, tips, and early access
              </p>
            </div>
            <p className="text-xs text-slate-500 mt-6 italic max-w-lg mx-auto lg:mx-0">
              "This isn&apos;t just learning about AI. It&apos;s learning WITH AI - your personal tutor adapts to your pace, 
              answers your questions, and ensures you truly understand."
            </p>
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
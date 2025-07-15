
import React from 'react';
import { CodeBracketIcon, CubeTransparentIcon, DocumentTextIcon, LogoIcon, ShareIcon, TrophyIcon, RocketLaunchIcon, SparklesIcon } from './Icons';

interface NextStepsViewProps {
  onReset: () => void;
  onClaimCertificate: () => void;
}

const PossibilityCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="bg-slate-800/80 p-6 rounded-xl transform hover:-translate-y-1.5 transition-transform duration-300 border border-slate-700/50 hover:border-cyan-400/50">
        <div className="text-cyan-400 mb-4">{icon}</div>
        <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
        <p className="text-slate-400 text-sm">{description}</p>
    </div>
);

const NextStepsView: React.FC<NextStepsViewProps> = ({ onReset, onClaimCertificate }) => {
  return (
    <div className="text-center max-w-5xl mx-auto py-10 animate-fade-in">
      <div className="inline-block p-4 bg-green-500/10 rounded-full mb-4 ring-4 ring-green-500/20">
          <TrophyIcon className="w-16 h-16 text-green-400" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Congratulations! Journey Complete!</h1>
      <p className="text-xl text-slate-300 mb-12">
        You've mastered the foundational grammar of AI. You now have the key to unlock a universe of creative possibilities.
      </p>

      <div className="mb-12">
        <button
          onClick={onClaimCertificate}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-10 rounded-full text-lg transition-all transform hover:scale-105 shadow-2xl shadow-yellow-500/20"
        >
          <SparklesIcon className="w-6 h-6" />
          Claim Your Certificate
        </button>
      </div>

      <div className="text-left mb-12">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">What will you create next?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PossibilityCard
                icon={<DocumentTextIcon className="w-10 h-10" />}
                title="Become a Content Creator"
                description="Use AI to write blog posts, marketing copy, social media updates, and even entire scripts. Your ideas, supercharged."
            />
            <PossibilityCard
                icon={<CodeBracketIcon className="w-10 h-10" />}
                title="Build a Website or App"
                description="Describe the app you want, and watch AI tools generate the frontend, backend, and logic for you. No-code, all creativity."
            />
            <PossibilityCard
                icon={<ShareIcon className="w-10 h-10" />}
                title="Master Digital Marketing"
                description="Let AI analyze market trends, perform competitor analysis, and create entire marketing campaigns tailored to your audience."
            />
            <PossibilityCard
                icon={<CubeTransparentIcon className="w-10 h-10" />}
                title="Generate Stunning Visuals"
                description="Create logos, illustrations, product photos, and artistic masterpieces simply by describing what you want to see."
            />
             <PossibilityCard
                icon={<DocumentTextIcon className="w-10 h-10" />}
                title="Ace Your Academics"
                description="Summarize dense research papers, get help writing essays, and generate presentations to explain complex topics with ease."
            />
             <PossibilityCard
                icon={<RocketLaunchIcon className="w-10 h-10" />}
                title="Launch a Product"
                description="Brainstorm new product ideas, generate 3D models, and create design specifications using AI as your co-designer."
            />
        </div>
      </div>
       <p className="text-slate-400 mb-6">This is just the beginning. The concepts you've learned are your passport to this new world.</p>
       <button
        onClick={onReset}
        className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors"
       >
        Restart the Journey
       </button>
    </div>
  );
};

export default NextStepsView;

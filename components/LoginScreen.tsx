import React, { useState } from 'react';
import { LogoIcon, BrainIcon, CodeBracketSquareIcon, CubeTransparentIcon } from './Icons';
import { authService } from '../services/firebaseService';

interface LoginScreenProps {
  onStart: (name: string) => void;
}

const ConceptCard = ({ icon, name, className }: { icon: React.ReactNode, name: string, className: string }) => (
    <div className={`flex items-center gap-3 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-lg px-4 py-2 shadow-lg ${className}`}>
        {icon}
        <span className="font-medium text-slate-200">{name}</span>
    </div>
);

const LoginScreen: React.FC<LoginScreenProps> = ({ onStart }) => {

    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [isGoogleSignInLoading, setIsGoogleSignInLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  const handleGoogleSignIn = async () => {
    setIsGoogleSignInLoading(true);
    setError(null);

    try {
      const user = await authService.signInWithGoogle();

      if (user) {
        onStart(user.name);
      } else {
        setError('Failed to sign in with Google. Please try again.');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      console.error('Error signing in with Google:', error);
      await authService.signOut();
    } finally {
      setIsGoogleSignInLoading(false);
    }
  }

  const handleEmailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setIsLoginLoading(true);
    setError(null);

    if (!email || !password) {
        setError('Please enter an email and password');
        setIsLoginLoading(false);
        return;
    }

    try {
        const user = await authService.signInWithEmail(email, password);

        if (user) {
            onStart(user.name);
        } else {
            setError('Failed to sign in with email. Please try again.');
        }
    } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
        console.error('Error signing in with email:', error);
        await authService.signOut();
    } finally {
        setIsLoginLoading(false);
    }
  }

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
              GreyWaken<br/>Awaken Your AI Potential
            </h1>
            <div className='flex flex-col gap-4 w-full'>
                <form onSubmit={handleEmailSignIn} className='flex flex-col gap-4 w-full'>
                    <input className='flex-1 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-lg px-4 py-2 shadow-lg' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className='flex-1 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-lg px-4 py-2 shadow-lg' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div className='flex flex-col gap-4'>
                        <button 
                            disabled={isLoginLoading}
                            className="bg-gradient-to-r from-gray-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold py-2 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-cyan-500/20 sm:w-auto flex-shrink-0"
                            type="submit"
                        >
                            {isLoginLoading ? 'Loading...' : 'Login'}
                        </button>
                        <button 
                            onClick={handleGoogleSignIn}
                            disabled={isGoogleSignInLoading}
                            className="bg-gradient-to-r from-gray-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold py-2 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-cyan-500/20 sm:w-auto flex-shrink-0"
                            type="submit"
                        >
                            {isGoogleSignInLoading ? 'Loading...' : 'Sign in with Google'}
                        </button>
                    </div>
                </form>
            </div>
            <div className='flex'>
              {error && (
                <p className="text-red-500 mt-2">{error}</p>
              )}
            </div>
        </div>
      </div>
      <footer className="w-full text-center text-xs text-slate-600 py-4 mt-auto flex-shrink-0">
          <p>© {new Date().getFullYear()} GreyWaken by greybrain.ai. Awaken your potential.</p>
      </footer>
    </div>
  );
};

export default LoginScreen;
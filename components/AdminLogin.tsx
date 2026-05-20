import React, { useState } from 'react';
import { LogoIcon, ShieldCheckIcon } from './Icons';
import { authService } from '../services/firebaseService';

interface AdminLoginProps {
  error: string | null;
  setError: (error: string | null) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ error, setError }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Calls Google Sign-In. Firebase auth state will change, 
      // triggering AdminApp's onAuthStateChanged listener to verify admin role.
      const user = await authService.signInWithGoogle();
      if (!user) {
        setError('Failed to sign in. Please try again.');
      }
    } catch (err: any) {
      console.error('Admin authentication error:', err);
      setError(err.message || 'Access denied or authentication failed.');
      // Keep Firebase Auth clean by signing out on failure
      await authService.signOut();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute h-96 w-96 bg-cyan-500 rounded-full -top-10 -left-20 mix-blend-lighten filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute h-96 w-96 bg-purple-500 rounded-full -bottom-10 -right-20 mix-blend-lighten filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative w-full max-w-md z-10">
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-800/80 p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-2xl mb-6 shadow-xl shadow-cyan-500/10 transform hover:scale-105 transition-transform duration-300">
              <ShieldCheckIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
              GreyWaken Admin
            </h1>
            <p className="text-slate-400 text-sm">
              Clinical Learning Platform Dashboard
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
              <p className="text-red-400 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Access Request Details */}
          <div className="bg-slate-950/50 rounded-2xl p-5 border border-slate-800/50 mb-8 space-y-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Dashboard Authentication</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Access is restricted to authorized platform administrators. You must authenticate using an approved Google account.
            </p>
          </div>

          {/* Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full bg-white hover:bg-slate-100 text-slate-900 font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Verifying credentials...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>Authenticate with Google</span>
              </>
            )}
          </button>

          {/* Footer */}
          <div className="mt-10 text-center">
            <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
              <LogoIcon className="w-4 h-4" />
              <span>GreyWaken Dashboard</span>
            </div>
            <p className="text-xs text-slate-650 mt-1">by greybrain.ai</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

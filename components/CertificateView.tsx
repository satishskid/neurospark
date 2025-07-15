import React from 'react';
import { LogoIcon, PrinterIcon, SparklesIcon } from './Icons';

interface CertificateViewProps {
  userName: string;
  onReset: () => void;
}

const CertificateView: React.FC<CertificateViewProps> = ({ userName, onReset }) => {
  const completionDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 font-sans">
      <style>{`
        @media print {
          body {
            background-color: white !important;
          }
          .print-hidden {
            display: none !important;
          }
          .certificate-container {
            border: none !important;
            box-shadow: none !important;
            transform: scale(1) !important;
          }
          .certificate-content {
             -webkit-print-color-adjust: exact !important;
             color-adjust: exact !important;
             color: #1e293b !important;
          }
           .certificate-content h1 {
             color: #1e293b !important;
           }
           .certificate-content .user-name {
             color: #0891b2 !important;
           }
            .certificate-content .logo-bg {
             opacity: 0.1 !important;
           }
        }
      `}</style>
      <div className="text-center mb-8 print-hidden">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">You did it!</h1>
        <p className="text-lg text-slate-300">Here is your official certificate of completion.</p>
      </div>
      
      <div className="w-full max-w-4xl bg-slate-50 text-slate-800 rounded-lg shadow-2xl p-8 relative overflow-hidden transition-transform duration-300 hover:scale-105 certificate-container">
        <LogoIcon className="absolute -top-16 -right-16 w-64 h-64 text-slate-200 opacity-30 rotate-12 logo-bg" />
        <div className="relative z-10 certificate-content">
            <div className="flex justify-between items-start mb-4">
                <div className="text-left">
                    <h1 className="text-4xl font-bold text-slate-900">Certificate of Completion</h1>
                    <p className="text-slate-500 font-medium">AI Journey: Foundations of AI</p>
                </div>
                <LogoIcon className="w-20 h-20 text-cyan-600" />
            </div>

            <div className="my-10 text-center">
                <p className="text-lg text-slate-600 mb-2">This certifies that</p>
                <h2 className="text-5xl font-extrabold text-cyan-700 user-name" style={{ fontFamily: "'Brush Script MT', cursive" }}>{userName}</h2>
                <p className="text-lg text-slate-600 mt-2">has successfully completed the comprehensive course on the fundamental concepts of Artificial Intelligence.</p>
            </div>
            
            <div className="flex justify-between items-end">
                <div className="text-left">
                    <p className="font-bold text-slate-700">Your AI Tutor</p>
                    <p className="text-sm text-slate-500">AI Journey Platform</p>
                </div>
                <div className="text-right">
                    <p className="font-bold text-slate-700">{completionDate}</p>
                    <p className="text-sm text-slate-500">Date of Completion</p>
                </div>
            </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4 print-hidden">
         <button
            onClick={() => window.print()}
            className="inline-flex items-center justify-center gap-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors"
        >
            <PrinterIcon className="w-6 h-6" />
            Print or Save as PDF
        </button>
         <button
            onClick={onReset}
            className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors"
        >
            Start a New Journey
       </button>
      </div>
      <footer className="text-center text-xs text-slate-600 pt-8 print-hidden">
          <p>© {new Date().getFullYear()} greybrain.ai. Tickle your grey matter.</p>
      </footer>
    </div>
  );
};

export default CertificateView;
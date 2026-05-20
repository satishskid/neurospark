import React, { useMemo } from 'react';
import { LogoIcon, PrinterIcon, SparklesIcon } from './Icons';

interface CertificateViewProps {
  userName: string;
  onReset: () => void;
}

// Simple deterministic hash to create a unique clinical credential ID
const generateCredentialID = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    const char = name.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  const cleanHash = Math.abs(hash).toString(16).toUpperCase().padStart(8, '0');
  return `GW-NS-${cleanHash.slice(0, 4)}-${cleanHash.slice(4, 8)}`;
};

const CertificateView: React.FC<CertificateViewProps> = ({ userName, onReset }) => {
  const completionDate = useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  const credentialID = useMemo(() => generateCredentialID(userName), [userName]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 md:p-8 font-sans overflow-x-hidden relative">
      {/* Dynamic Background Blobs */}
      <div className="absolute inset-0 z-0 opacity-20 print:hidden">
        <div className="absolute h-[500px] w-[500px] bg-cyan-500 rounded-full -top-40 -left-40 mix-blend-lighten filter blur-3xl opacity-30"></div>
        <div className="absolute h-[500px] w-[500px] bg-purple-500 rounded-full -bottom-45 -right-45 mix-blend-lighten filter blur-3xl opacity-30"></div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;800&family=Great+Vibes&family=Montserrat:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,500&display=swap');

        .cert-outer-border {
          font-family: 'Montserrat', sans-serif;
        }
        .cert-title {
          font-family: 'Cinzel', serif;
        }
        .cert-script {
          font-family: 'Great Vibes', cursive;
        }
        .cert-serif {
          font-family: 'Playfair Display', serif;
        }

        @media print {
          body {
            background-color: white !important;
            color: black !important;
          }
          .print-hidden {
            display: none !important;
          }
          .certificate-container {
            border: none !important;
            box-shadow: none !important;
            transform: scale(1) !important;
            background: #fffbf5 !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          .cert-paper {
            border: 12px double #b8860b !important;
            background-color: #fffbf5 !important;
            background: #fffbf5 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      {/* Intro Panel */}
      <div className="text-center mb-8 max-w-xl z-10 print-hidden">
        <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold mb-4 tracking-wider uppercase">
          <SparklesIcon className="w-4 h-4 animate-spin-slow" />
          <span>Clinical Curriculum Completed</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight mb-3 cert-serif">
          Congratulations, Doctor!
        </h1>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          You have mastered the foundations of Clinical AI. Below is your official certificate of completion, ready for licensing verification and PDF download.
        </p>
      </div>
      
      {/* Certificate Frame */}
      <div className="w-full max-w-4xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 rounded-3xl p-5 md:p-8 shadow-2xl border border-slate-800/80 relative transition-transform duration-500 hover:scale-[1.01] certificate-container z-10">
        
        {/* Ivory/Parchment Paper */}
        <div className="bg-[#FAF6F0] rounded-2xl p-6 md:p-12 relative overflow-hidden cert-paper border-[10px] double border-[#d4af37]">
          
          {/* Faded Watermark */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center select-none">
            <LogoIcon className="w-[500px] h-[500px] text-slate-900 rotate-12" />
          </div>

          <div className="relative z-10 flex flex-col justify-between h-full space-y-8">
            
            {/* Headers */}
            <div className="flex justify-between items-center gap-4 border-b border-[#ebd7a0] pb-6">
              <div className="text-left">
                <p className="text-[#b8860b] text-[10px] md:text-xs font-bold font-mono tracking-widest uppercase">
                  GreyWaken & NeuroSpark Accreditation
                </p>
                <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight cert-title mt-1">
                  BOARD CERTIFICATION
                </h2>
              </div>
              
              <div className="flex items-center gap-2 shrink-0">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-extrabold text-base md:text-xl">GW</span>
                </div>
                <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-extrabold text-base md:text-xl">NS</span>
                </div>
              </div>
            </div>

            {/* Certificate Body Wording */}
            <div className="text-center py-4 space-y-6">
              <p className="text-slate-650 text-xs md:text-sm font-semibold tracking-widest uppercase font-mono">
                This is to certify that
              </p>
              
              <div className="py-2">
                <h3 className="text-4xl md:text-6xl text-[#1e293b] font-medium leading-none cert-script py-1 hover:text-[#b8860b] transition-colors duration-300">
                  {userName}
                </h3>
                <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-3"></div>
              </div>

              <p className="text-slate-700 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed cert-serif italic">
                has successfully completed the comprehensive clinical AI curriculum, demonstrating core proficiency in translating biological systems to software architectures, semantic prompt engineering, secure HIPAA/PHI guardrails, and automated clinical clinical-automation workflows.
              </p>

              <h4 className="text-slate-800 text-base md:text-xl font-bold tracking-wider uppercase font-mono">
                CLINICAL ARTIFICIAL INTELLIGENCE CURRICULUM
              </h4>
            </div>
            
            {/* Seals and Signature blocks */}
            <div className="grid grid-cols-1 md:grid-cols-3 items-end gap-8 pt-8 border-t border-[#ebd7a0]/60">
              
              {/* Signature Left */}
              <div className="text-center md:text-left space-y-2">
                <p className="cert-script text-2xl text-slate-850 h-8 font-medium">Dr. Pranit S.</p>
                <div className="border-t border-slate-400 w-full pt-1.5">
                  <p className="text-slate-800 text-xs font-bold uppercase font-mono tracking-wider">Dr. Pranit S.</p>
                  <p className="text-slate-500 text-[10px]">Lead Clinical Director, GreyWaken AI</p>
                </div>
              </div>

              {/* Gold Foil Seal Center */}
              <div className="flex flex-col items-center justify-center shrink-0 py-2">
                <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#ffd700] via-[#d4af37] to-[#b8860b] rounded-full flex items-center justify-center shadow-xl border-4 border-double border-white select-none">
                  {/* Decorative Spikes */}
                  <div className="absolute inset-0.5 rounded-full border-2 border-dashed border-[#FAF6F0]/60 opacity-60"></div>
                  
                  {/* Inner Text */}
                  <div className="text-center text-[#FAF6F0] flex flex-col items-center font-mono leading-none z-10">
                    <svg className="w-7 h-7 text-[#FAF6F0] mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-[7px] uppercase font-bold tracking-wider">VERIFIED</span>
                    <span className="text-[6px] opacity-75 mt-0.5 font-bold tracking-widest">CREDENTIAL</span>
                  </div>
                </div>
              </div>

              {/* Signature Right */}
              <div className="text-center md:text-right space-y-2">
                <p className="cert-script text-2xl text-slate-850 h-8 font-medium">Satish S.</p>
                <div className="border-t border-slate-400 w-full pt-1.5">
                  <p className="text-slate-800 text-xs font-bold uppercase font-mono tracking-wider">Satish S.</p>
                  <p className="text-slate-500 text-[10px]">Director of AI Engineering, NeuroSpark</p>
                </div>
              </div>

            </div>

            {/* Credential verification tag footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-6 border-t border-[#ebd7a0]/40 text-[9px] md:text-xs font-mono text-slate-500">
              <div className="flex gap-2">
                <span>CREDENTIAL ID:</span>
                <span className="font-bold text-slate-700 select-all">{credentialID}</span>
              </div>
              <div>
                <span>COMPLETION DATE: {completionDate}</span>
              </div>
              <div className="flex gap-1.5 items-center">
                <svg className="w-3.5 h-3.5 text-[#b8860b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <a href="https://verify.greybrain.ai" target="_blank" rel="noopener noreferrer" className="hover:underline text-[#b8860b] font-bold">
                  verify.greybrain.ai
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Print / Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 print-hidden z-10">
         <button
            onClick={() => window.print()}
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3.5 px-8 rounded-2xl text-base transition-all duration-300 transform hover:scale-[1.03] shadow-xl shadow-cyan-500/10"
        >
            <PrinterIcon className="w-5 h-5" />
            Print or Save as PDF
        </button>
         <button
            onClick={onReset}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 font-bold py-3.5 px-8 rounded-2xl text-base transition-all duration-300 transform hover:scale-[1.03]"
        >
            Start a New Journey
       </button>
      </div>

      {/* Footer footer */}
      <footer className="text-center text-xs text-slate-600 py-8 print-hidden z-10">
          <p>© {new Date().getFullYear()} greybrain.ai. All clinical credentials verified.</p>
      </footer>
    </div>
  );
};

export default CertificateView;
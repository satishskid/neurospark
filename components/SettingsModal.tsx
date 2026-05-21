import React, { useState, useEffect } from 'react';
import { XMarkIcon, KeyIcon } from './Icons';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [geminiKey, setGeminiKey] = useState('');
  const [groqKey, setGroqKey] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');

  useEffect(() => {
    if (isOpen) {
      setGeminiKey(localStorage.getItem('byok_gemini_key') || '');
      setGroqKey(localStorage.getItem('byok_groq_key') || '');
      setSaveStatus('idle');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    localStorage.setItem('byok_gemini_key', geminiKey);
    localStorage.setItem('byok_groq_key', groqKey);
    setSaveStatus('saved');
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
        <div className="flex justify-between items-center p-4 border-b border-slate-700 bg-slate-800/50">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <KeyIcon className="w-6 h-6 text-cyan-400" />
            Global Settings
          </h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">Bring Your Own Key (BYOK)</h3>
            <p className="text-xs text-slate-400 mb-4">Enter your API keys to power the AI Tutor. Your keys are stored locally in your browser and never sent to our servers.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Google Gemini API Key</label>
                <input
                  type="password"
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  placeholder="AIzaSy..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Groq API Key (Fallback)</label>
                <input
                  type="password"
                  value={groqKey}
                  onChange={(e) => setGroqKey(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  placeholder="gsk_..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-700 bg-slate-800/50 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 rounded-md text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-500 transition-colors flex items-center gap-2">
            {saveStatus === 'saved' ? 'Saved!' : 'Save Keys'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;

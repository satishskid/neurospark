import React, { useMemo, useRef, useState, useEffect } from 'react';
import { getChatbotResponse } from '../services/aiService';
import { CURRICULUM } from '../constants';
import { ChatHistoryItem, Module } from '../types';
import { LogoIcon, XMarkIcon } from './Icons';

const CapstoneTutor = ({ onClose, initialQuery }: { onClose: () => void, initialQuery?: string }) => {
  const capstoneModule: Module | undefined = CURRICULUM.find(m => m.id === 'module-capstone');
  const [history, setHistory] = useState<ChatHistoryItem[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSentInitial, setHasSentInitial] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const curriculumSummary = useMemo(() => CURRICULUM.map(m => `Module ${m.id}: ${m.title}`).join('\n'), []);
  const moduleReference = useMemo(() => {
    const module = capstoneModule;
    if (!module) return '';
    const lessons = module.lessons || [];
    return lessons.map(l => {
      const fr = (l.furtherReading || []).map(link => `- ${link.label}: ${link.url}`).join('\n');
      const gl = (l.glossary || []).map(g => `- ${g.term}: ${g.definition}`).join('\n');
      const ft = (l.footnotes || []).map(f => `- ${f}`).join('\n');
      return `Lesson ${l.id}: ${l.title}\n${l.referenceText || ''}\n\nFurther Reading:\n${fr}\n\nGlossary:\n${gl}\n\nFootnotes:\n${ft}`;
    }).join('\n\n');
  }, [capstoneModule]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const send = async (query: string) => {
    if (!query.trim() || isLoading || !capstoneModule) return;
    const newHistory: ChatHistoryItem[] = [...history, { role: 'user', content: query }];
    setHistory(newHistory);
    setIsLoading(true);
    try {
      const response = await getChatbotResponse(capstoneModule, curriculumSummary, moduleReference, newHistory, query);
      setHistory(prev => [...prev, { role: 'model', content: response }]);
    } catch (e) {
      setHistory(prev => [...prev, { role: 'model', content: "I'm having a little trouble thinking right now. Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery && !hasSentInitial) {
      setHasSentInitial(true);
      send(initialQuery);
    }
  }, [initialQuery]);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-2xl w-full max-w-2xl h-[80vh] flex flex-col border border-slate-700" onClick={e => e.stopPropagation()}>
        <header className="p-4 border-b border-slate-700 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-lg">Capstone Tutor</h3>
            <p className="text-sm text-slate-400">Guidance for capstone milestones</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-700">
            <XMarkIcon className="w-6 h-6 text-slate-400" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {history.map((item, index) => (
            <div key={index} className={`flex items-start gap-3 ${item.role === 'user' ? 'justify-end' : ''}`}>
              {item.role === 'model' && <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0"><LogoIcon className="w-5 h-5 text-cyan-400"/></div>}
              <div className={`max-w-md p-3 rounded-xl ${item.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'}`}>
                <p className="text-sm">{item.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0"><LogoIcon className="w-5 h-5 text-cyan-400 animate-spin"/></div>
              <div className="max-w-md p-3 rounded-xl bg-slate-700 text-slate-400 rounded-bl-none italic">Thinking...</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={(e) => { e.preventDefault(); send(userInput); setUserInput(''); }} className="p-4 border-t border-slate-700">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask a capstone question..."
            className="w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-400 rounded-lg py-2 px-4 focus:ring-2 focus:ring-cyan-500 transition-all"
            disabled={isLoading}
          />
        </form>
      </div>
    </div>
  );
};

export default CapstoneTutor;
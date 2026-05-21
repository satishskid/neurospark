
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Lesson, Module, ChatHistoryItem } from '../types';
import QuizView from './QuizView';
import ExerciseView from './ExerciseView';
import { TrophyIcon, ChatBubbleLeftRightIcon, XMarkIcon, LogoIcon, Cog6ToothIcon, KeyIcon } from './Icons';
import { getChatbotResponse } from '../services/aiService';
import { CURRICULUM } from '../constants';

const ChatbotModal = ({ module, onClose }: { module: Module | undefined, onClose: () => void }) => {
    const [history, setHistory] = useState<ChatHistoryItem[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [geminiKey, setGeminiKey] = useState(() => localStorage.getItem('byok_gemini_key') || '');
    const [groqKey, setGroqKey] = useState(() => localStorage.getItem('byok_groq_key') || '');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const curriculumSummary = useMemo(() => CURRICULUM.map(m => `Module ${m.id.split('-')[1]}: ${m.title}`).join('\n'), []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [history]);
    
    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading || !module) return;

        const newHistory: ChatHistoryItem[] = [...history, { role: 'user', content: userInput }];
        setHistory(newHistory);
        setUserInput('');
        setIsLoading(true);

        try {
            const response = await getChatbotResponse(module, curriculumSummary, newHistory, userInput);
            setHistory(prev => [...prev, { role: 'model', content: response }]);
        } catch (error) {
            setHistory(prev => [...prev, { role: 'model', content: "I'm having a little trouble thinking right now. Please try again in a moment." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const saveKeys = () => {
        localStorage.setItem('byok_gemini_key', geminiKey);
        localStorage.setItem('byok_groq_key', groqKey);
        setShowSettings(false);
    };
    
    return (
        <div className="fixed inset-0 bg-black/60 z-40 flex justify-center items-center p-4 animate-fade-in-fast" onClick={onClose}>
            <div className="bg-slate-800 rounded-2xl w-full max-w-2xl h-[80vh] flex flex-col shadow-2xl border border-slate-700 animate-slide-up" onClick={e => e.stopPropagation()}>
                <header className="p-4 border-b border-slate-700 flex justify-between items-center flex-shrink-0">
                    <div>
                        <h3 className="font-bold text-white text-lg">AI Tutor {showSettings && 'Settings'}</h3>
                        <p className="text-sm text-slate-400">{showSettings ? 'Configure your BYOK API Keys' : `Asking about: ${module?.title || 'Current Topic'}`}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setShowSettings(!showSettings)} className={`p-2 rounded-full transition-colors ${showSettings ? 'bg-cyan-500/20 text-cyan-400' : 'hover:bg-slate-700 text-slate-400'}`} title="Configure API Keys">
                            <Cog6ToothIcon className="w-6 h-6" />
                        </button>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-700 text-slate-400">
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </div>
                </header>
                
                {showSettings ? (
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        <div className="bg-slate-700/30 p-5 rounded-2xl border border-slate-700">
                            <div className="flex items-center gap-3 mb-4">
                                <KeyIcon className="w-6 h-6 text-cyan-400" />
                                <h4 className="text-white font-semibold">Gemini API Key (Primary)</h4>
                            </div>
                            <input
                                type="password"
                                value={geminiKey}
                                onChange={e => setGeminiKey(e.target.value)}
                                placeholder="AIzaSy..."
                                className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg py-3 px-4 focus:ring-2 focus:ring-cyan-500 transition-all mb-2"
                            />
                            <p className="text-xs text-slate-400">Get your free key at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Google AI Studio</a></p>
                        </div>

                        <div className="bg-slate-700/30 p-5 rounded-2xl border border-slate-700">
                            <div className="flex items-center gap-3 mb-4">
                                <KeyIcon className="w-6 h-6 text-green-400" />
                                <h4 className="text-white font-semibold">Groq API Key (Fallback)</h4>
                            </div>
                            <input
                                type="password"
                                value={groqKey}
                                onChange={e => setGroqKey(e.target.value)}
                                placeholder="gsk_..."
                                className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg py-3 px-4 focus:ring-2 focus:ring-green-500 transition-all mb-2"
                            />
                            <p className="text-xs text-slate-400">Get your ultra-fast API key at <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">Groq Console</a></p>
                        </div>
                        
                        <div className="pt-4 flex justify-end">
                            <button onClick={saveKeys} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2.5 px-6 rounded-xl transition-colors">
                                Save Configuration
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {history.length === 0 && (
                                <div className="text-center text-slate-400 py-10 px-4">
                                    <LogoIcon className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                                    <p className="mb-2">Hello! I'm your AI Tutor.</p>
                                    <p className="text-sm">Ask me anything about the current module, or ask for an analogy to help you understand better!</p>
                                    {(!geminiKey && !groqKey) && (
                                        <p className="text-amber-400 text-sm mt-4 font-semibold">Please click the gear icon to configure your API keys first.</p>
                                    )}
                                </div>
                            )}
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
                                    <div className="max-w-md p-3 rounded-xl bg-slate-700 text-slate-400 rounded-bl-none italic">
                                        Thinking...
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                        <form onSubmit={handleSend} className="p-4 border-t border-slate-700">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Ask a question about this module..."
                                className="w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-400 rounded-lg py-2 px-4 focus:ring-2 focus:ring-cyan-500 transition-all"
                                disabled={isLoading || (!geminiKey && !groqKey)}
                            />
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};


interface LessonViewProps {
  lesson: Lesson;
  onComplete: () => void;
}

const LessonView: React.FC<LessonViewProps> = ({ lesson, onComplete }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const currentModule = CURRICULUM.find(m => m.lessons.some(l => l.id === lesson.id));

  const renderContent = () => {
    switch(lesson.type) {
      case 'content':
        return (
          <>
            {lesson.videoLinks && lesson.videoLinks.length > 0 && (
              <div className="mb-8 p-6 bg-slate-800/80 border border-slate-700/80 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clipRule="evenodd" />
                  </svg>
                  Visual Learning References
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {lesson.videoLinks.map((video, idx) => (
                    <a key={idx} href={video.url} target="_blank" rel="noopener noreferrer" className="flex flex-col gap-2 p-4 rounded-xl bg-slate-900 border border-slate-700 hover:border-red-500 transition-colors group">
                      <div className="flex items-start justify-between">
                         <span className="font-semibold text-slate-200 group-hover:text-white transition-colors line-clamp-2 text-sm">{video.title}</span>
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-slate-500 group-hover:text-red-400 flex-shrink-0">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                         </svg>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
            <div className="prose prose-invert prose-lg max-w-none text-slate-300 prose-strong:text-cyan-400">
                {lesson.content}
            </div>
             <div className="mt-12 text-center border-t border-slate-700/50 pt-8">
                <button 
                  onClick={onComplete}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg shadow-green-500/20"
                >
                  <TrophyIcon className="w-6 h-6" />
                  Lesson Complete!
                </button>
              </div>
          </>
        );
      case 'quiz':
        return lesson.quiz ? <QuizView quiz={lesson.quiz} onComplete={onComplete} /> : <p>Quiz not available.</p>;
      case 'exercise':
        return lesson.exercise ? <ExerciseView exercise={lesson.exercise} onComplete={onComplete} /> : <p>Exercise not available.</p>;
      default:
        return <p>Invalid lesson type.</p>
    }
  }
  
  return (
    <>
      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-2 tracking-tight">{lesson.title}</h1>
          <div className="h-1.5 w-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
        </div>
        
        {renderContent()}
      </div>
      <button 
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full p-4 shadow-2xl shadow-cyan-500/30 transform hover:scale-110 transition-transform duration-300 z-30"
        aria-label="Ask a question"
      >
          <ChatBubbleLeftRightIcon className="w-8 h-8" />
      </button>

      {isChatOpen && <ChatbotModal module={currentModule} onClose={() => setIsChatOpen(false)} />}
    </>
  );
};

export default LessonView;
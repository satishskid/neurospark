
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Lesson, Module, ChatHistoryItem } from '../types';
import QuizView from './QuizView';
import ExerciseView from './ExerciseView';
import { TrophyIcon, ChatBubbleLeftRightIcon, XMarkIcon, LogoIcon } from './Icons';
import { getChatbotResponse } from '../services/aiService';
import { CURRICULUM } from '../constants';

const ChatbotModal = ({ module, onClose }: { module: Module | undefined, onClose: () => void }) => {
    const [history, setHistory] = useState<ChatHistoryItem[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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
    
    return (
        <div className="fixed inset-0 bg-black/60 z-40 flex justify-center items-center p-4 animate-fade-in-fast" onClick={onClose}>
            <div className="bg-slate-800 rounded-2xl w-full max-w-2xl h-[80vh] flex flex-col shadow-2xl border border-slate-700 animate-slide-up" onClick={e => e.stopPropagation()}>
                <header className="p-4 border-b border-slate-700 flex justify-between items-center flex-shrink-0">
                    <div>
                        <h3 className="font-bold text-white text-lg">AI Tutor</h3>
                        <p className="text-sm text-slate-400">Asking about: {module?.title || 'Current Topic'}</p>
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
                        disabled={isLoading}
                    />
                </form>
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
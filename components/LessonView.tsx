
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Lesson, Module, ChatHistoryItem } from '../types';
import QuizView from './QuizView';
import ExerciseView from './ExerciseView';
import { TrophyIcon, ChatBubbleLeftRightIcon, XMarkIcon, LogoIcon } from './Icons';
import { getChatbotResponse } from '../services/aiService';
import { CURRICULUM, CURRICULUM_MEDICAL } from '../constants';

const ChatbotModal = ({ module, onClose, initialQuery }: { module: Module | undefined, onClose: () => void, initialQuery?: string }) => {
    const [history, setHistory] = useState<ChatHistoryItem[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [hasSentInitial, setHasSentInitial] = useState(false);

    const curriculumSummary = useMemo(() => CURRICULUM.map(m => `Module ${m.id.split('-')[1]}: ${m.title}`).join('\n'), []);
    const moduleReference = useMemo(() => {
        if (!module) return '';
        const lessons = module.lessons || [];
        return lessons.map(l => {
            const fr = (l.furtherReading || []).map(link => `- ${link.label}: ${link.url}`).join('\n');
            const gl = (l.glossary || []).map(g => `- ${g.term}: ${g.definition}`).join('\n');
            const ft = (l.footnotes || []).map(f => `- ${f}`).join('\n');
            return `Lesson ${l.id}: ${l.title}\n${l.referenceText || ''}\n\nFurther Reading:\n${fr}\n\nGlossary:\n${gl}\n\nFootnotes:\n${ft}`;
        }).join('\n\n');
    }, [module]);

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
            const response = await getChatbotResponse(module, curriculumSummary, moduleReference, newHistory, userInput);
            setHistory(prev => [...prev, { role: 'model', content: response }]);
        } catch (error) {
            setHistory(prev => [...prev, { role: 'model', content: "I'm having a little trouble thinking right now. Please try again in a moment." }]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const sendInitial = async () => {
            if (!initialQuery || hasSentInitial || isLoading || !module) return;
            const newHistory: ChatHistoryItem[] = [...history, { role: 'user', content: initialQuery }];
            setHistory(newHistory);
            setIsLoading(true);
            try {
                const response = await getChatbotResponse(module, curriculumSummary, moduleReference, newHistory, initialQuery);
                setHistory(prev => [...prev, { role: 'model', content: response }]);
            } catch (error) {
                setHistory(prev => [...prev, { role: 'model', content: "I'm having a little trouble thinking right now. Please try again in a moment." }]);
            } finally {
                setIsLoading(false);
                setHasSentInitial(true);
            }
        };
        sendInitial();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialQuery, module]);
    
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
  const [initialChatQuery, setInitialChatQuery] = useState<string | null>(null);
  const allModules = [...CURRICULUM, ...CURRICULUM_MEDICAL];
  const currentModule = allModules.find(m => m.lessons.some(l => l.id === lesson.id));

  const renderContent = () => {
    switch(lesson.type) {
      case 'content':
        return (
          <>
            <div className="prose prose-invert prose-lg max-w-none text-slate-300 prose-strong:text-cyan-400">
                {lesson.content}
            </div>
            <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <h3 className="text-white font-semibold mb-3">Check Your Understanding</h3>
              <div className="space-y-2">
                {(lesson.checkPrompts && lesson.checkPrompts.length ? lesson.checkPrompts : [
                  `Summarize "${lesson.title}" to a 10-year-old.`,
                  `Predict where mistakes occur in this topic and how to avoid them.`,
                  `Explain the key idea of "${lesson.title}" with a simple example.`,
                  `What are the most important terms from "${lesson.title}" and what do they mean?`,
                  `How would you apply "${lesson.title}" in a real scenario?`
                ]).map((q, i) => (
                  <div key={i} className="flex items-center justify-between gap-4">
                    <p className="text-slate-300 text-sm flex-1">{q}</p>
                    <button
                      onClick={() => { setInitialChatQuery(q); setIsChatOpen(true); }}
                      className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 text-white rounded text-sm"
                    >Ask via Tutor</button>
                  </div>
                ))}
              </div>
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

      {isChatOpen && <ChatbotModal module={currentModule} onClose={() => setIsChatOpen(false)} initialQuery={initialChatQuery || undefined} />}
    </>
  );
};

export default LessonView;
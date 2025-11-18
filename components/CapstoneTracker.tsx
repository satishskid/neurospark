import React, { useEffect, useState } from 'react';
import { CURRICULUM, CURRICULUM_MEDICAL } from '../constants';

const STORAGE_KEY = 'capstone-progress';

const CapstoneTracker = ({ onClose, onAskTutor }: { onClose: () => void, onAskTutor: (prompt: string) => void }) => {
  const capstoneGeneral = CURRICULUM.find(m => m.id === 'module-capstone');
  const capstoneMedical = CURRICULUM_MEDICAL.find(m => m.id === 'module-capstone');
  const capstones = [capstoneGeneral, capstoneMedical].filter(Boolean);
  
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [selectedCapstoneId, setSelectedCapstoneId] = useState<string>(capstones[0]?.id || '');
  const selectedCapstone = capstones.find(c => c?.id === selectedCapstoneId);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setCompleted(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  }, [completed]);

  if (capstones.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-slate-900 z-50 flex">
      {/* Sidebar - Capstone Navigation */}
      <aside className="w-80 flex-shrink-0 bg-slate-800/50 border-r border-slate-700/50 flex flex-col">
        <header className="p-6 border-b border-slate-700/50">
          <h1 className="text-2xl font-bold text-white mb-1">🎓 Capstone</h1>
          <p className="text-slate-400 text-sm">Final project tracker</p>
        </header>
        
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {capstones.map((capstone) => {
              if (!capstone) return null;
              const completedCount = capstone.lessons.filter(l => completed[l.id]).length;
              const totalCount = capstone.lessons.length;
              const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
              
              return (
                <button
                  key={capstone.id}
                  onClick={() => setSelectedCapstoneId(capstone.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedCapstoneId === capstone.id
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50'
                  }`}
                >
                  <div className="font-semibold text-sm">{capstone.title}</div>
                  <div className="text-xs mt-1 opacity-90">{completedCount}/{totalCount} completed</div>
                  <div className="mt-2 w-full bg-slate-900/30 rounded-full h-1.5">
                    <div 
                      className="bg-white h-1.5 rounded-full transition-all" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </nav>

        <footer className="p-4 border-t border-slate-700/50">
          <button 
            onClick={onClose} 
            className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            ← Back to Journey
          </button>
        </footer>
      </aside>

      {/* Main Content Panel */}
      <main className="flex-1 overflow-y-auto bg-slate-900 p-8">
        {selectedCapstone ? (
          <div className="max-w-4xl">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">{selectedCapstone.title}</h2>
              <p className="text-slate-400 text-lg">{selectedCapstone.description}</p>
            </div>

            <div className="space-y-4">
              {selectedCapstone.lessons.map(lesson => (
                <div 
                  key={lesson.id} 
                  className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:bg-slate-800/70 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={!!completed[lesson.id]}
                      onChange={() => setCompleted(prev => ({ ...prev, [lesson.id]: !prev[lesson.id] }))}
                      className="w-5 h-5 mt-1 cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-white font-semibold text-xl">{lesson.title}</h3>
                          <span className="text-slate-400 text-sm">~{lesson.estimatedTimeMinutes} min</span>
                        </div>
                        <button
                          onClick={() => onAskTutor(`Help me with: ${lesson.title}. ${lesson.referenceText || ''}`)}
                          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          💬 Ask Tutor
                        </button>
                      </div>
                      
                      {lesson.referenceText && (
                        <p className="text-slate-300 text-base mb-4 leading-relaxed">{lesson.referenceText}</p>
                      )}
                      
                      {lesson.checkPrompts && lesson.checkPrompts.length > 0 && (
                        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                          <h4 className="text-white font-semibold text-sm mb-2">💡 Suggested Prompts:</h4>
                          <ul className="text-slate-300 text-sm space-y-2">
                            {lesson.checkPrompts.map((p, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-blue-400 mt-0.5">•</span>
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg">No capstone project available</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CapstoneTracker;

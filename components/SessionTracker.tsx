import React, { useMemo, useState, useEffect } from 'react';
import { Module, Lesson } from '../types';

const STORAGE_KEY = 'session-progress';

const SessionTracker = ({ modules, onClose, onStartSession }: { modules: Module[], onClose: () => void, onStartSession: (lessonId: string) => void }) => {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [selectedModuleId, setSelectedModuleId] = useState<string>(modules[0]?.id || '');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setCompleted(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  }, [completed]);

  const sessionsByModule = useMemo(() => {
    return modules.map((module) => {
      const sessions: { lessons: Lesson[] }[] = [];
      let current: Lesson[] = [];
      let sum = 0;
      module.lessons.forEach(l => {
        current.push(l);
        sum += l.estimatedTimeMinutes;
        if (sum >= 25) {
          sessions.push({ lessons: current });
          current = [];
          sum = 0;
        }
      });
      if (current.length) sessions.push({ lessons: current });
      return { moduleId: module.id, moduleTitle: module.title, sessions };
    });
  }, [modules]);

  const selectedModuleData = sessionsByModule.find(m => m.moduleId === selectedModuleId);

  return (
    <div className="fixed inset-0 bg-slate-900 z-50 flex">
      {/* Sidebar - Module Navigation */}
      <aside className="w-80 flex-shrink-0 bg-slate-800/50 border-r border-slate-700/50 flex flex-col">
        <header className="p-6 border-b border-slate-700/50">
          <h1 className="text-2xl font-bold text-white mb-1">📅 Sessions</h1>
          <p className="text-slate-400 text-sm">30-minute learning plans</p>
        </header>
        
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {sessionsByModule.map(({ moduleId, moduleTitle, sessions }, idx) => {
              const completedCount = sessions.filter((_, i) => completed[`${moduleId}-session-${i+1}`]).length;
              const totalCount = sessions.length;
              const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
              
              return (
                <button
                  key={moduleId}
                  onClick={() => setSelectedModuleId(moduleId)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedModuleId === moduleId
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50'
                  }`}
                >
                  <div className="font-semibold text-sm">Module {idx + 1}</div>
                  <div className="text-xs mt-1 opacity-90">{moduleTitle}</div>
                  <div className="text-xs mt-1 opacity-75">{completedCount}/{totalCount} sessions</div>
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
        {selectedModuleData ? (
          <div className="max-w-4xl">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">{selectedModuleData.moduleTitle}</h2>
              <p className="text-slate-400 text-lg">{selectedModuleData.sessions.length} sessions • ~30 minutes each</p>
            </div>

            <div className="space-y-4">
              {selectedModuleData.sessions.map((s, i) => {
                const key = `${selectedModuleData.moduleId}-session-${i+1}`;
                const total = s.lessons.reduce((acc, x) => acc + x.estimatedTimeMinutes, 0);
                const firstId = s.lessons[0]?.id;
                const warmup = s.lessons[0]?.title;
                const cumulative = s.lessons[s.lessons.length - 1]?.type === 'quiz' ? s.lessons[s.lessons.length - 1]?.title : null;
                const core = s.lessons.slice(1, cumulative ? s.lessons.length - 1 : undefined).map(x => x.title).join(', ');
                
                return (
                  <div 
                    key={key} 
                    className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:bg-slate-800/70 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={!!completed[key]}
                        onChange={() => setCompleted(prev => ({ ...prev, [key]: !prev[key] }))}
                        className="w-5 h-5 mt-1 cursor-pointer"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-white font-bold text-xl">Session {i + 1}</h3>
                            <span className="text-slate-400 text-sm">~{total} minutes</span>
                          </div>
                          <button
                            onClick={() => { if (firstId) onStartSession(firstId); }}
                            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-medium transition-colors"
                          >
                            ▶️ Start Session
                          </button>
                        </div>
                        
                        <div className="space-y-3 text-slate-300">
                          <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                            <span className="font-semibold text-blue-400">🔥 Warmup:</span> {warmup || '—'}
                          </div>
                          <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                            <span className="font-semibold text-cyan-400">💪 Core:</span> {core || '—'}
                          </div>
                          <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                            <span className="font-semibold text-purple-400">🔍 Review:</span> Use Check Your Understanding prompts
                          </div>
                          {cumulative && (
                            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                              <span className="font-semibold text-green-400">✅ Cumulative Check:</span> {cumulative}
                            </div>
                          )}
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-700/50">
                          <h4 className="text-white font-semibold text-sm mb-2">📝 Lessons in this session:</h4>
                          <ul className="text-slate-400 text-sm space-y-1">
                            {s.lessons.map((lesson, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <span className="text-cyan-400">•</span>
                                <span>{lesson.title} ({lesson.estimatedTimeMinutes} min)</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg">No sessions available</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SessionTracker;

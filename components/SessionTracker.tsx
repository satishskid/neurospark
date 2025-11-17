import React, { useMemo, useState, useEffect } from 'react';
import { Module, Lesson } from '../types';

const STORAGE_KEY = 'session-progress';

const SessionTracker = ({ modules, onClose, onStartSession }: { modules: Module[], onClose: () => void, onStartSession: (lessonId: string) => void }) => {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

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

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-slate-700" onClick={e => e.stopPropagation()}>
        <header className="p-4 border-b border-slate-700 flex items-center justify-between">
          <h2 className="text-white text-xl font-bold">Session Progress</h2>
          <button onClick={onClose} className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded">Close</button>
        </header>
        <div className="p-6 space-y-6">
          {sessionsByModule.map(({ moduleId, moduleTitle, sessions }) => (
            <div key={moduleId} className="bg-slate-700/30 rounded-lg border border-slate-600/30">
              <div className="p-4 border-b border-slate-600/30">
                <h3 className="text-white font-semibold">{moduleTitle}</h3>
              </div>
              <div className="p-4 space-y-4">
                {sessions.map((s, i) => {
                  const key = `${moduleId}-session-${i+1}`;
                  const total = s.lessons.reduce((acc, x) => acc + x.estimatedTimeMinutes, 0);
                  const firstId = s.lessons[0]?.id;
                  const titles = s.lessons.map(x => x.title).join(', ');
                  return (
                    <div key={key} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={!!completed[key]}
                          onChange={() => setCompleted(prev => ({ ...prev, [key]: !prev[key] }))}
                          className="w-4 h-4"
                        />
                        <div>
                          <div className="text-white font-medium">Session {i + 1} • ~{total} min</div>
                          <div className="text-slate-400 text-xs">{titles}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { if (firstId) onStartSession(firstId); }}
                          className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 text-white rounded text-sm"
                        >Start</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SessionTracker;
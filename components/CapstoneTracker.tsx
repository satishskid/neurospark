import React, { useEffect, useState } from 'react';
import { CURRICULUM } from '../constants';

const STORAGE_KEY = 'capstone-progress';

const CapstoneTracker = ({ onClose, onAskTutor }: { onClose: () => void, onAskTutor: (prompt: string) => void }) => {
  const capstone = CURRICULUM.find(m => m.id === 'module-capstone');
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

  if (!capstone) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-slate-700" onClick={e => e.stopPropagation()}>
        <header className="p-4 border-b border-slate-700 flex items-center justify-between">
          <h2 className="text-white text-xl font-bold">Capstone Tracker</h2>
          <button onClick={onClose} className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded">Close</button>
        </header>
        <div className="p-6 space-y-4">
          <p className="text-slate-300 text-sm">Track milestones and ask the Tutor for guidance.</p>
          {capstone.lessons.map(lesson => (
            <div key={lesson.id} className="p-4 bg-slate-700/30 border border-slate-600/30 rounded">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={!!completed[lesson.id]}
                    onChange={() => setCompleted(prev => ({ ...prev, [lesson.id]: !prev[lesson.id] }))}
                    className="w-4 h-4"
                  />
                  <div>
                    <div className="text-white font-semibold">{lesson.title}</div>
                    <div className="text-slate-400 text-xs">~{lesson.estimatedTimeMinutes} min</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onAskTutor(`Help me with: ${lesson.title}. ${lesson.referenceText || ''}`)}
                    className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 text-white rounded text-sm"
                  >Ask via Tutor</button>
                </div>
              </div>
              {lesson.checkPrompts && lesson.checkPrompts.length > 0 && (
                <div className="mt-2">
                  <div className="text-slate-300 text-sm mb-1">Suggested prompts:</div>
                  <ul className="text-slate-400 text-xs space-y-1">
                    {lesson.checkPrompts.map((p, i) => (
                      <li key={i}>• {p}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CapstoneTracker;
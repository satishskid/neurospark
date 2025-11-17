import React from 'react';
import { CURRICULUM } from '../constants';

const GlossaryView = ({ onClose }: { onClose: () => void }) => {
  const terms: { term: string; definition: string }[] = [];
  CURRICULUM.forEach(module => {
    module.lessons.forEach(lesson => {
      (lesson.glossary || []).forEach(g => {
        if (!terms.find(t => t.term.toLowerCase() === g.term.toLowerCase())) {
          terms.push({ term: g.term, definition: g.definition });
        }
      });
    });
  });

  const sorted = terms.sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-slate-700" onClick={e => e.stopPropagation()}>
        <header className="p-4 border-b border-slate-700 flex items-center justify-between">
          <h2 className="text-white text-xl font-bold">Glossary</h2>
          <button onClick={onClose} className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded">Close</button>
        </header>
        <div className="p-6">
          <ul className="space-y-3">
            {sorted.map((t, i) => (
              <li key={i} className="p-3 bg-slate-700/30 border border-slate-600/30 rounded">
                <div className="text-white font-semibold">{t.term}</div>
                <div className="text-slate-300 text-sm">{t.definition}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GlossaryView;
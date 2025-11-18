import React, { useState } from 'react';
import { CURRICULUM, MASTERY_RUBRICS } from '../constants';
import { Module } from '../types';

interface SyllabusViewProps {
  onClose: () => void;
  onStartSession?: (lessonId: string) => void;
  activeCourseLabel?: 'General' | 'Medical';
  activeCurriculum?: Module[];
}

const SyllabusView: React.FC<SyllabusViewProps> = ({ onClose, onStartSession, activeCourseLabel = 'General', activeCurriculum }) => {
  const curriculum = activeCurriculum || CURRICULUM;
  const [selectedModuleId, setSelectedModuleId] = useState<string>(curriculum[0]?.id || '');
  const selectedModule = curriculum.find(m => m.id === selectedModuleId);

  return (
    <div className="fixed inset-0 bg-slate-900 z-50 flex">
      {/* Sidebar - Table of Contents */}
      <aside className="w-80 flex-shrink-0 bg-slate-800/50 border-r border-slate-700/50 flex flex-col">
        <header className="p-6 border-b border-slate-700/50">
          <h1 className="text-2xl font-bold text-white mb-1">📚 Syllabus</h1>
          <p className="text-slate-400 text-sm">Complete course reference</p>
          <div className="mt-2 text-xs text-slate-400">
            Curriculum: <span className="text-white font-medium">{activeCourseLabel}</span>
          </div>
        </header>
        
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {curriculum.map((module, idx) => (
              <button
                key={module.id}
                onClick={() => setSelectedModuleId(module.id)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  selectedModuleId === module.id
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                <div className="font-semibold text-sm">Module {idx + 1}</div>
                <div className="text-xs mt-1 opacity-90">{module.title}</div>
                <div className="text-xs mt-1 opacity-75">{module.lessons.length} lessons</div>
              </button>
            ))}
            <button
              onClick={() => setSelectedModuleId('rubrics')}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                selectedModuleId === 'rubrics'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              <div className="font-semibold text-sm">Mastery Rubrics</div>
              <div className="text-xs mt-1 opacity-75">Assessment criteria</div>
            </button>
          </div>
        </nav>

        <footer className="p-4 border-t border-slate-700/50 space-y-2">
          <button 
            onClick={() => window.print()} 
            className="w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            🖨️ Print Syllabus
          </button>
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
        {selectedModuleId === 'rubrics' ? (
          <section className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-white mb-2">Mastery Rubrics</h2>
            <p className="text-slate-400 mb-6">Criteria for assessing core skills</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(MASTERY_RUBRICS).map(([key, rubric]) => (
                <div key={key} className="p-5 bg-slate-700/30 rounded-lg border border-slate-600/30">
                  <h3 className="text-white font-semibold text-lg mb-3">{rubric.title}</h3>
                  <ul className="text-slate-300 text-sm space-y-2">
                    {rubric.criteria.map((c: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ) : selectedModule ? (
          <section className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-white mb-2">{selectedModule.title}</h2>
            <p className="text-slate-400 mb-6">{selectedModule.description}</p>
            <div className="space-y-8">
              {selectedModule.lessons.map((lesson) => (
                <div key={lesson.id} className="border-t border-slate-700/50 pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-white">{lesson.title}</h3>
                    <span className="text-sm text-slate-400 bg-slate-700/50 px-3 py-1 rounded-full">
                      ⏱️ {lesson.estimatedTimeMinutes} min
                    </span>
                  </div>
                  {lesson.referenceText && (
                    <div className="text-slate-300 text-base whitespace-pre-line mb-4 leading-relaxed">
                      {lesson.referenceText}
                    </div>
                  )}
                  {lesson.learningObjectives && lesson.learningObjectives.length > 0 && (
                    <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <h4 className="text-white font-semibold text-base mb-2">🎯 Learning Objectives</h4>
                      <ul className="text-slate-300 space-y-2">
                        {lesson.learningObjectives.map((obj, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-blue-400 mt-1">•</span>
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {lesson.glossary && lesson.glossary.length > 0 && (
                    <div className="mt-4 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                      <h4 className="text-white font-semibold text-base mb-2">📖 Key Terms</h4>
                      <ul className="text-slate-300 space-y-2">
                        {lesson.glossary.map((g, i) => (
                          <li key={i}>
                            <span className="font-semibold text-cyan-400">{g.term}:</span> {g.definition}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {lesson.furtherReading && lesson.furtherReading.length > 0 && (
                    <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                      <h4 className="text-white font-semibold text-base mb-2">📚 Further Reading</h4>
                      <ul className="text-slate-300 space-y-2">
                        {lesson.furtherReading.map((l, i) => (
                          <li key={i}>
                            <a href={l.url} target="_blank" rel="noreferrer" className="text-purple-400 hover:text-purple-300 underline">
                              {l.label} →
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {lesson.footnotes && lesson.footnotes.length > 0 && (
                    <div className="mt-4 p-4 bg-slate-700/30 border border-slate-600/30 rounded-lg">
                      <h4 className="text-white font-semibold text-sm mb-2">📝 Footnotes</h4>
                      <ul className="text-slate-400 text-xs space-y-1">
                        {lesson.footnotes.map((f, i) => (
                          <li key={i}>[{i + 1}] {f}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-8 p-5 bg-slate-700/30 rounded-lg border border-slate-600/30">
                <h4 className="text-white font-semibold text-lg mb-4">📅 Suggested 30-Minute Sessions</h4>
                {(() => {
                  const sessions: { lessons: typeof selectedModule.lessons }[] = [];
                  let current: typeof selectedModule.lessons = [];
                  let sum = 0;
                  selectedModule.lessons.forEach(l => {
                    current.push(l);
                    sum += l.estimatedTimeMinutes;
                    if (sum >= 25) {
                      sessions.push({ lessons: current });
                      current = [];
                      sum = 0;
                    }
                  });
                  if (current.length) sessions.push({ lessons: current });
                  return (
                    <div className="space-y-4">
                      {sessions.map((s, i) => {
                        const warmup = s.lessons[0]?.title;
                        const cumulative = s.lessons[s.lessons.length - 1]?.type === 'quiz' ? s.lessons[s.lessons.length - 1]?.title : null;
                        const core = s.lessons.slice(1, cumulative ? s.lessons.length - 1 : undefined).map(x => x.title).join(', ');
                        const total = s.lessons.reduce((acc, x) => acc + x.estimatedTimeMinutes, 0);
                        return (
                          <div key={i} className="p-4 bg-slate-800/50 rounded-lg border border-slate-600/30">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-white font-semibold text-base">Session {i + 1} • ~{total} min</span>
                              <div className="flex items-center gap-2">
                                {onStartSession && (
                                  <button
                                    onClick={() => {
                                      const firstId = s.lessons[0]?.id;
                                      if (firstId) onStartSession(firstId);
                                    }}
                                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-medium transition-colors"
                                  >▶️ Start Session</button>
                                )}
                                <button
                                  onClick={() => {
                                    const html = `<!DOCTYPE html><html><head><title>Session ${i + 1}</title></head><body><h1>Session ${i + 1} (~${total} min)</h1><p><strong>Warmup:</strong> ${warmup || '—'}</p><p><strong>Core:</strong> ${core || '—'}</p><p><strong>Review:</strong> Use Check Your Understanding prompts</p><p><strong>Cumulative Check:</strong> ${cumulative || '—'}</p></body></html>`;
                                    const w = window.open('', '_blank');
                                    if (w) { w.document.write(html); w.document.close(); w.print(); }
                                  }}
                                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors"
                                >🖨️ Print</button>
                              </div>
                            </div>
                            <div className="text-slate-300 space-y-1 text-sm">
                              <div><span className="font-semibold text-slate-200">Warmup:</span> {warmup || '—'}</div>
                              <div><span className="font-semibold text-slate-200">Core:</span> {core || '—'}</div>
                              <div><span className="font-semibold text-slate-200">Review:</span> Use Check Your Understanding prompts</div>
                              <div><span className="font-semibold text-slate-200">Cumulative Check:</span> {cumulative || '—'}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
};

export default SyllabusView;
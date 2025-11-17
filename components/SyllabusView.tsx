import React from 'react';
import { CURRICULUM, MASTERY_RUBRICS } from '../constants';

const SyllabusView = ({ onClose, onStartSession, activeCourseLabel }: { onClose: () => void, onStartSession: (lessonId: string) => void, activeCourseLabel: string }) => {
  return (
    <div className="min-h-screen bg-slate-900">
      <header className="bg-slate-800/50 border-b border-slate-700/50 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Syllabus</h1>
          <p className="text-slate-400">Printable reference for all modules</p>
          <div className="mt-1 text-xs text-slate-400">Active Curriculum: <span className="text-white font-medium">{activeCourseLabel}</span></div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => window.print()} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg">Print</button>
          <button onClick={onClose} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg">Close</button>
        </div>
      </header>
      <main className="p-6 space-y-8">
        {CURRICULUM.map((module) => (
          <section key={module.id} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <h2 className="text-xl font-bold text-white mb-1">{module.title}</h2>
            <p className="text-slate-400 mb-4">{module.description}</p>
            <div className="space-y-6">
              {module.lessons.map((lesson) => (
                <div key={lesson.id} className="border-t border-slate-700/50 pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{lesson.title}</h3>
                    <span className="text-xs text-slate-400">{lesson.estimatedTimeMinutes} min</span>
                  </div>
                  {lesson.referenceText && (
                    <p className="text-slate-300 text-sm whitespace-pre-line">{lesson.referenceText}</p>
                  )}
                  {lesson.learningObjectives && lesson.learningObjectives.length > 0 && (
                    <div className="mt-3">
                      <h4 className="text-white font-medium text-sm mb-1">Learning Objectives</h4>
                      <ul className="text-slate-300 text-sm space-y-1">
                        {lesson.learningObjectives.map((obj, i) => (
                          <li key={i}>• {obj}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {lesson.glossary && lesson.glossary.length > 0 && (
                    <div className="mt-3">
                      <h4 className="text-white font-medium text-sm mb-1">Glossary</h4>
                      <ul className="text-slate-300 text-sm space-y-1">
                        {lesson.glossary.map((g, i) => (
                          <li key={i}>• {g.term}: {g.definition}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {lesson.furtherReading && lesson.furtherReading.length > 0 && (
                    <div className="mt-3">
                      <h4 className="text-white font-medium text-sm mb-1">Further Reading</h4>
                      <ul className="text-slate-300 text-sm space-y-1">
                        {lesson.furtherReading.map((l, i) => (
                          <li key={i}><a href={l.url} target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-cyan-300">{l.label}</a></li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {lesson.footnotes && lesson.footnotes.length > 0 && (
                    <div className="mt-3">
                      <h4 className="text-white font-medium text-sm mb-1">Footnotes</h4>
                      <ul className="text-slate-400 text-xs space-y-1">
                        {lesson.footnotes.map((f, i) => (
                          <li key={i}>[{i + 1}] {f}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-6 p-4 bg-slate-700/30 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Sessions (30‑minute plans)</h4>
                {(() => {
                  const sessions: { lessons: typeof module.lessons }[] = [];
                  let current: typeof module.lessons = [];
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
                  return (
                    <div className="space-y-3">
                      {sessions.map((s, i) => {
                        const warmup = s.lessons[0]?.title;
                        const cumulative = s.lessons[s.lessons.length - 1]?.type === 'quiz' ? s.lessons[s.lessons.length - 1]?.title : null;
                        const core = s.lessons.slice(1, cumulative ? s.lessons.length - 1 : undefined).map(x => x.title).join(', ');
                        const total = s.lessons.reduce((acc, x) => acc + x.estimatedTimeMinutes, 0);
                        return (
                          <div key={i} className="text-sm text-slate-300">
                            <div className="flex items-center justify-between">
                              <span className="text-white font-medium">Session {i + 1} • ~{total} min</span>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => {
                                    const firstId = s.lessons[0]?.id;
                                    if (firstId) onStartSession(firstId);
                                  }}
                                  className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 text-white rounded"
                                >Start Session</button>
                                <button
                                  onClick={() => {
                                    const html = `<!DOCTYPE html><html><head><title>Session ${i + 1}</title></head><body><h1>Session ${i + 1} (~${total} min)</h1><p><strong>Warmup:</strong> ${warmup || '—'}</p><p><strong>Core:</strong> ${core || '—'}</p><p><strong>Review:</strong> Use Check Your Understanding prompts</p><p><strong>Cumulative Check:</strong> ${cumulative || '—'}</p></body></html>`;
                                    const w = window.open('', '_blank');
                                    if (w) { w.document.write(html); w.document.close(); w.print(); }
                                  }}
                                  className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded"
                                >Print Session</button>
                              </div>
                            </div>
                            <div>Warmup: {warmup || '—'}</div>
                            <div>Core: {core || '—'}</div>
                            <div>Review: Use Check Your Understanding prompts</div>
                            <div>Cumulative Check: {cumulative || '—'}</div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            </div>
          </section>
        ))}
        <section className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
          <h2 className="text-xl font-bold text-white mb-1">Mastery Rubrics</h2>
          <p className="text-slate-400 mb-4">Criteria for assessing core skills</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(MASTERY_RUBRICS).map(([key, rubric]) => (
              <div key={key} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                <h3 className="text-white font-semibold mb-2">{rubric.title}</h3>
                <ul className="text-slate-300 text-sm space-y-1">
                  {rubric.criteria.map((c: string, idx: number) => (
                    <li key={idx}>• {c}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SyllabusView;
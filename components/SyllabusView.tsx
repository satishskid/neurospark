import React, { useState } from 'react';
import { CURRICULUM, MASTERY_RUBRICS } from '../constants';
import { Module } from '../types';
import { ENRICHED_LESSONS } from '../enrichedContent';

interface SyllabusViewProps {
  onClose: () => void;
  onStartSession?: (lessonId: string) => void;
  activeCourseLabel?: 'Basics' | 'Medical';
  activeCurriculum?: Module[];
}

const SyllabusView: React.FC<SyllabusViewProps> = ({ onClose, onStartSession, activeCourseLabel = 'Basics', activeCurriculum }) => {
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
      <main className="flex-1 overflow-y-auto bg-white p-8">
        <style>{`
          @media print {
            .no-print { display: none !important; }
            .print-page-break { page-break-after: always; }
          }
          
          /* Professional typography */
          .syllabus-content {
            font-family: 'Georgia', 'Times New Roman', serif;
            line-height: 1.8;
            color: #1a1a1a;
          }
          
          .syllabus-content h1 {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            font-weight: 700;
            letter-spacing: -0.02em;
          }
          
          .syllabus-content h2, .syllabus-content h3 {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            font-weight: 600;
          }
          
          /* Pull quote styling */
          .pull-quote {
            border-left: 4px solid #0891b2;
            padding-left: 1.5rem;
            font-style: italic;
            font-size: 1.125rem;
            color: #374151;
            margin: 2rem 0;
          }
          
          /* Key takeaway box */
          .key-takeaway {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border: 2px solid #0891b2;
            border-radius: 8px;
            padding: 1.5rem;
            margin: 2rem 0;
          }
          
          /* Case study box */
          .case-study {
            background: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 1.5rem;
            margin: 2rem 0;
          }
          
          /* Figure caption */
          .figure-caption {
            font-size: 0.875rem;
            color: #6b7280;
            font-style: italic;
            text-align: center;
            margin-top: 0.5rem;
          }
          
          /* Two-column layout for dense content */
          .two-column {
            column-count: 2;
            column-gap: 2rem;
            column-rule: 1px solid #e5e7eb;
          }
          
          @media (max-width: 1024px) {
            .two-column {
              column-count: 1;
            }
          }
        `}</style>
        {selectedModuleId === 'rubrics' ? (
          <article className="syllabus-content max-w-5xl mx-auto">
            <header className="mb-12 pb-8 border-b-2 border-gray-300">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">Mastery Rubrics</h1>
              <p className="text-xl text-gray-600 leading-relaxed">Assessment Framework for Core Competencies</p>
            </header>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-8">
                These rubrics provide a structured framework for evaluating proficiency across key dimensions of AI literacy 
                in healthcare. Each criterion reflects industry standards and best practices established by leading medical 
                institutions and technology organizations.
              </p>
            </div>

            <section className="mb-12">
              <div className="space-y-10">
                {Object.entries(MASTERY_RUBRICS).map(([key, rubric], idx) => (
                  <div key={key} className="bg-white border-2 border-gray-200 rounded-lg p-8 shadow-sm">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{rubric.title}</h3>
                        <p className="text-gray-600 italic">Core competency assessment criteria</p>
                      </div>
                    </div>
                    
                    <div className="pl-16">
                      <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Evaluation Criteria</h4>
                      <ul className="space-y-3">
                        {rubric.criteria.map((c: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-800 leading-relaxed">
                            <span className="flex-shrink-0 w-6 h-6 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                              {idx + 1}
                            </span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </article>
        ) : selectedModule ? (
          <article className="syllabus-content max-w-5xl mx-auto">
            {/* Module Header - Publication Style */}
            <header className="mb-12 pb-8 border-b-2 border-gray-300">
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full font-semibold">
                  Module {curriculum.findIndex(m => m.id === selectedModule.id) + 1}
                </span>
                <span>•</span>
                <span>{selectedModule.lessons.length} Lessons</span>
                <span>•</span>
                <span>{selectedModule.lessons.reduce((sum, l) => sum + l.estimatedTimeMinutes, 0)} minutes</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">{selectedModule.title}</h1>
              <p className="text-xl text-gray-600 leading-relaxed">{selectedModule.description}</p>
            </header>

            {/* Module Overview */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">Module Overview</h2>
              <div className="key-takeaway">
                <h3 className="text-lg font-semibold text-cyan-900 mb-3">📚 What You'll Learn</h3>
                <ul className="space-y-2 text-gray-800">
                  {selectedModule.lessons.slice(0, 5).map((lesson, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-600 font-bold">→</span>
                      <span>{lesson.title}</span>
                    </li>
                  ))}
                  {selectedModule.lessons.length > 5 && (
                    <li className="text-gray-600 italic">...and {selectedModule.lessons.length - 5} more topics</li>
                  )}
                </ul>
              </div>
            </section>
            {/* Lessons - Academic Paper Style */}
            <section className="space-y-12">
              {selectedModule.lessons.map((lesson, lessonIdx) => (
                <article key={lesson.id} className="print-page-break">
                  {/* Lesson Header */}
                  <header className="mb-6">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      <span className="font-semibold text-cyan-700">Lesson {lessonIdx + 1}</span>
                      <span>•</span>
                      <span>{lesson.estimatedTimeMinutes} minutes</span>
                      <span>•</span>
                      <span className="capitalize">{lesson.type}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">{lesson.title}</h2>
                  </header>

                  {/* Executive Summary */}
                  {ENRICHED_LESSONS[lesson.id as keyof typeof ENRICHED_LESSONS]?.executiveSummary && (
                    <div className="mb-8 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
                      <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
                        <span className="text-2xl">📋</span>
                        Executive Summary
                      </h3>
                      <p className="text-gray-800 leading-relaxed italic">
                        {ENRICHED_LESSONS[lesson.id as keyof typeof ENRICHED_LESSONS].executiveSummary}
                      </p>
                    </div>
                  )}

                  {/* Main Content */}
                  {ENRICHED_LESSONS[lesson.id as keyof typeof ENRICHED_LESSONS]?.detailedContent ? (
                    <div className="prose prose-lg max-w-none mb-8">
                      <div 
                        className="text-gray-800 leading-relaxed"
                        dangerouslySetInnerHTML={{ 
                          __html: ENRICHED_LESSONS[lesson.id as keyof typeof ENRICHED_LESSONS].detailedContent
                            .split('\n')
                            .map(line => {
                              // Convert markdown-style headers
                              if (line.startsWith('### ')) return `<h3 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">${line.slice(4)}</h3>`;
                              if (line.startsWith('#### ')) return `<h4 class="text-xl font-semibold text-gray-900 mt-6 mb-3">${line.slice(5)}</h4>`;
                              if (line.startsWith('## ')) return `<h2 class="text-3xl font-bold text-gray-900 mt-10 mb-6 pb-3 border-b-2 border-gray-300">${line.slice(3)}</h2>`;
                              // Convert bold
                              line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>');
                              // Convert lists
                              if (line.trim().startsWith('- ')) return `<li class="ml-6 mb-2">${line.slice(2)}</li>`;
                              // Regular paragraphs
                              if (line.trim()) return `<p class="mb-4">${line}</p>`;
                              return '';
                            })
                            .join('')
                        }}
                      />
                    </div>
                  ) : lesson.referenceText && (
                    <div className="prose prose-lg max-w-none mb-8">
                      <div className="text-gray-800 leading-relaxed whitespace-pre-line text-justify">
                        {lesson.referenceText}
                      </div>
                    </div>
                  )}

                  {/* Case Studies */}
                  {ENRICHED_LESSONS[lesson.id as keyof typeof ENRICHED_LESSONS]?.caseStudies && (
                    <section className="my-12">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                        📊 Case Studies
                      </h3>
                      {ENRICHED_LESSONS[lesson.id as keyof typeof ENRICHED_LESSONS].caseStudies.map((study, idx) => (
                        <div key={idx} className="mb-8 p-6 bg-amber-50 border-l-4 border-amber-600 rounded-r-lg">
                          <h4 className="text-xl font-bold text-amber-900 mb-4">{study.title}</h4>
                          <div 
                            className="text-gray-800 leading-relaxed whitespace-pre-line"
                            dangerouslySetInnerHTML={{ __html: study.content }}
                          />
                        </div>
                      ))}
                    </section>
                  )}

                  {/* Practical Exercises */}
                  {ENRICHED_LESSONS[lesson.id as keyof typeof ENRICHED_LESSONS]?.practicalExercises && (
                    <section className="my-12">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                        ✏️ Practical Exercises
                      </h3>
                      {ENRICHED_LESSONS[lesson.id as keyof typeof ENRICHED_LESSONS].practicalExercises.map((exercise, idx) => (
                        <div key={idx} className="mb-8 p-6 bg-green-50 border-l-4 border-green-600 rounded-r-lg">
                          <h4 className="text-xl font-bold text-green-900 mb-4">{exercise.title}</h4>
                          <div className="text-gray-800 leading-relaxed whitespace-pre-line">
                            {exercise.instructions}
                          </div>
                        </div>
                      ))}
                    </section>
                  )}

                  {/* Key Takeaways */}
                  {ENRICHED_LESSONS[lesson.id as keyof typeof ENRICHED_LESSONS]?.keyTakeaways && (
                    <aside className="my-8 p-6 bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-600 rounded-xl">
                      <h3 className="text-xl font-semibold text-cyan-900 mb-4 flex items-center gap-2">
                        <span className="text-2xl">💡</span>
                        Key Takeaways
                      </h3>
                      <ul className="space-y-3">
                        {ENRICHED_LESSONS[lesson.id as keyof typeof ENRICHED_LESSONS].keyTakeaways.map((takeaway, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-800">
                            <span className="flex-shrink-0 w-6 h-6 bg-cyan-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="leading-relaxed">{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </aside>
                  )}

                  {/* Common Pitfalls */}
                  {ENRICHED_LESSONS[lesson.id as keyof typeof ENRICHED_LESSONS]?.commonPitfalls && (
                    <section className="my-12">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                        ⚠️ Common Pitfalls & Solutions
                      </h3>
                      {ENRICHED_LESSONS[lesson.id as keyof typeof ENRICHED_LESSONS].commonPitfalls.map((item, idx) => (
                        <div key={idx} className="mb-6 p-6 bg-red-50 border-l-4 border-red-600 rounded-r-lg">
                          <h4 className="text-lg font-bold text-red-900 mb-2">❌ {item.pitfall}</h4>
                          <p className="text-gray-800 mb-2"><strong className="text-green-700">✓ Solution:</strong> {item.solution}</p>
                          <p className="text-gray-700 italic text-sm"><strong>Example:</strong> {item.example}</p>
                        </div>
                      ))}
                    </section>
                  )}
                  {/* Learning Objectives - Sidebar Style */}
                  {lesson.learningObjectives && lesson.learningObjectives.length > 0 && (
                    <aside className="my-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-600 rounded-r-lg">
                      <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                        <span className="text-2xl">🎯</span>
                        Learning Objectives
                      </h3>
                      <ul className="space-y-3">
                        {lesson.learningObjectives.map((obj, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-800">
                            <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                              {i + 1}
                            </span>
                            <span className="leading-relaxed">{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </aside>
                  )}

                  {/* Key Terms - Definition List Style */}
                  {lesson.glossary && lesson.glossary.length > 0 && (
                    <aside className="my-8 p-6 bg-amber-50 border-l-4 border-amber-600 rounded-r-lg">
                      <h3 className="text-lg font-semibold text-amber-900 mb-4 flex items-center gap-2">
                        <span className="text-2xl">📖</span>
                        Key Terminology
                      </h3>
                      <dl className="space-y-4">
                        {lesson.glossary.map((g, i) => (
                          <div key={i} className="border-b border-amber-200 pb-3 last:border-0">
                            <dt className="font-bold text-amber-900 mb-1">{g.term}</dt>
                            <dd className="text-gray-700 leading-relaxed pl-4">{g.definition}</dd>
                          </div>
                        ))}
                      </dl>
                    </aside>
                  )}

                  {/* Further Reading - Academic Citation Style */}
                  {(ENRICHED_LESSONS[lesson.id as keyof typeof ENRICHED_LESSONS]?.furtherReading || lesson.furtherReading) && (
                    <aside className="my-8 p-6 bg-purple-50 border-l-4 border-purple-600 rounded-r-lg">
                      <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center gap-2">
                        <span className="text-2xl">📚</span>
                        References & Further Reading
                      </h3>
                      <ol className="space-y-4">
                        {ENRICHED_LESSONS[lesson.id as keyof typeof ENRICHED_LESSONS]?.furtherReading ? (
                          ENRICHED_LESSONS[lesson.id as keyof typeof ENRICHED_LESSONS].furtherReading.map((ref, i) => (
                            <li key={i} className="text-gray-700 leading-relaxed pl-6">
                              <div className="font-semibold text-gray-900">
                                {ref.authors} ({ref.year}). {ref.title}.
                              </div>
                              <div className="italic text-gray-700">{ref.journal}</div>
                              {ref.doi && (
                                <div className="text-sm text-purple-700">
                                  DOI: <a href={`https://doi.org/${ref.doi}`} target="_blank" rel="noreferrer" className="underline hover:text-purple-900">{ref.doi}</a>
                                </div>
                              )}
                              {ref.summary && (
                                <div className="text-sm text-gray-600 mt-1">{ref.summary}</div>
                              )}
                            </li>
                          ))
                        ) : lesson.furtherReading?.map((l, i) => (
                          <li key={i} className="text-gray-700 leading-relaxed">
                            <a 
                              href={l.url} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="text-purple-700 hover:text-purple-900 underline font-medium"
                            >
                              {l.label}
                            </a>
                          </li>
                        ))}
                      </ol>
                    </aside>
                  )}

                  {/* Footnotes - Academic Style */}
                  {lesson.footnotes && lesson.footnotes.length > 0 && (
                    <footer className="mt-8 pt-6 border-t border-gray-300">
                      <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Notes</h4>
                      <ol className="space-y-2 text-sm text-gray-600 leading-relaxed">
                        {lesson.footnotes.map((f, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="font-semibold">[{i + 1}]</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ol>
                    </footer>
                  )}
                </article>
              ))}
            </section>

            {/* Session Planning - Instructor Guide Style */}
            <section className="mt-16 p-8 bg-gradient-to-br from-gray-50 to-slate-50 border-2 border-gray-300 rounded-xl">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2 flex items-center gap-3">
                  <span className="text-3xl">📅</span>
                  Instructional Sessions
                </h3>
                <p className="text-gray-600 mb-6 italic">Structured 30-minute learning modules for optimal knowledge retention</p>
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
                    <div className="space-y-6">
                  {sessions.map((s, i) => {
                    const warmup = s.lessons[0]?.title;
                    const cumulative = s.lessons[s.lessons.length - 1]?.type === 'quiz' ? s.lessons[s.lessons.length - 1]?.title : null;
                    const core = s.lessons.slice(1, cumulative ? s.lessons.length - 1 : undefined).map(x => x.title).join(', ');
                    const total = s.lessons.reduce((acc, x) => acc + x.estimatedTimeMinutes, 0);
                    return (
                      <div key={i} className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-1">Session {i + 1}</h4>
                            <p className="text-sm text-gray-600">Duration: ~{total} minutes</p>
                          </div>
                          <div className="flex items-center gap-2 no-print">
                            {onStartSession && (
                              <button
                                onClick={() => {
                                  const firstId = s.lessons[0]?.id;
                                  if (firstId) onStartSession(firstId);
                                }}
                                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-medium transition-colors"
                              >▶️ Start</button>
                            )}
                            <button
                              onClick={() => {
                                const html = `<!DOCTYPE html><html><head><title>Session ${i + 1}</title><style>body{font-family:Georgia,serif;max-width:800px;margin:40px auto;line-height:1.6}</style></head><body><h1>Session ${i + 1} (~${total} min)</h1><p><strong>Warmup:</strong> ${warmup || '—'}</p><p><strong>Core Content:</strong> ${core || '—'}</p><p><strong>Review:</strong> Use Check Your Understanding prompts</p><p><strong>Assessment:</strong> ${cumulative || '—'}</p></body></html>`;
                                const w = window.open('', '_blank');
                                if (w) { w.document.write(html); w.document.close(); w.print(); }
                              }}
                              className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors"
                            >🖨️ Print</button>
                          </div>
                        </div>
                        
                        <div className="space-y-3 text-gray-800">
                          <div className="flex gap-3">
                            <span className="font-semibold text-blue-700 min-w-[140px]">Warmup (5 min):</span>
                            <span>{warmup || '—'}</span>
                          </div>
                          <div className="flex gap-3">
                            <span className="font-semibold text-cyan-700 min-w-[140px]">Core Content (15 min):</span>
                            <span>{core || '—'}</span>
                          </div>
                          <div className="flex gap-3">
                            <span className="font-semibold text-purple-700 min-w-[140px]">Review (5 min):</span>
                            <span>Interactive discussion using Check Your Understanding prompts</span>
                          </div>
                          {cumulative && (
                            <div className="flex gap-3">
                              <span className="font-semibold text-green-700 min-w-[140px]">Assessment (5 min):</span>
                              <span>{cumulative}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                    </div>
                  );
                })()}
              </section>
            </article>
        ) : null}
      </main>
    </div>
  );
};

export default SyllabusView;
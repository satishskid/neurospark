import { useMemo, useState } from 'react';
import { CURRICULUM, CURRICULUM_MEDICAL } from '../constants';
import { TECH_GLOSSARY, searchGlossary } from '../glossaryData';
import { XMarkIcon } from './Icons';

const GlossaryView = ({ onClose }: { onClose: () => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'technical' | 'course'>('all');

  // Get course-specific glossary terms from lessons
  const courseGlossaryTerms = useMemo(() => {
    const termsMap = new Map<string, { term: string; definition: string; modules: string[] }>();
    
    [...CURRICULUM, ...CURRICULUM_MEDICAL].forEach(module => {
      module.lessons.forEach(lesson => {
        if (lesson.glossary) {
          lesson.glossary.forEach(({ term, definition }) => {
            if (termsMap.has(term)) {
              const existing = termsMap.get(term)!;
              if (!existing.modules.includes(module.title)) {
                existing.modules.push(module.title);
              }
            } else {
              termsMap.set(term, { term, definition, modules: [module.title] });
            }
          });
        }
      });
    });

    return Array.from(termsMap.values()).sort((a, b) => a.term.localeCompare(b.term));
  }, []);

  // Combine and filter terms
  const filteredTerms = useMemo(() => {
    let terms: any[] = [];

    if (filter === 'all' || filter === 'technical') {
      const techTerms = searchTerm 
        ? searchGlossary(searchTerm)
        : TECH_GLOSSARY;
      terms = [...terms, ...techTerms.map(t => ({ ...t, type: 'technical' }))];
    }

    if (filter === 'all' || filter === 'course') {
      const courseTerms = searchTerm
        ? courseGlossaryTerms.filter(item => 
            item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
            item.definition.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : courseGlossaryTerms;
      terms = [...terms, ...courseTerms.map(t => ({ ...t, type: 'course' }))];
    }

    return terms.sort((a, b) => a.term.localeCompare(b.term));
  }, [searchTerm, filter, courseGlossaryTerms]);

  // Group terms by first letter
  const groupedTerms = useMemo(() => {
    const groups: Record<string, typeof filteredTerms> = {};
    filteredTerms.forEach(term => {
      const firstLetter = term.term[0].toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(term);
    });
    return groups;
  }, [filteredTerms]);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-slate-700" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <header className="p-4 border-b border-slate-700 flex items-center justify-between sticky top-0 bg-slate-800 z-10">
          <div>
            <h2 className="text-white text-xl font-bold">📝 Glossary</h2>
            <p className="text-slate-400 text-sm mt-1">
              {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''} 
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-700 transition-colors">
            <XMarkIcon className="w-6 h-6 text-slate-400" />
          </button>
        </header>
        
        <div className="p-6">
          {/* Search and Filter */}
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Search terms..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="flex-1 bg-slate-700 border border-slate-600 text-white placeholder-slate-400 rounded-lg py-2 px-4 focus:ring-2 focus:ring-cyan-500 transition-all"
            />
            <select
              value={filter}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilter(e.target.value as any)}
              className="bg-slate-700 border border-slate-600 text-white rounded-lg py-2 px-4 focus:ring-2 focus:ring-cyan-500 transition-all"
            >
              <option value="all">All Terms</option>
              <option value="technical">Technical Terms</option>
              <option value="course">Course Terms</option>
            </select>
          </div>

          {/* Terms List */}
          <div className="space-y-6">
            {filteredTerms.length === 0 ? (
              <p className="text-slate-400 text-center py-8">No terms found matching "{searchTerm}"</p>
            ) : (
              Object.keys(groupedTerms).sort().map(letter => (
                <div key={letter}>
                  <h3 className="text-2xl font-bold text-cyan-400 mb-3">{letter}</h3>
                  <div className="space-y-3">
                    {groupedTerms[letter].map((item) => (
                      <div key={item.term} className="p-4 bg-slate-700/30 border border-slate-600/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-white font-semibold text-lg">{item.term}</h4>
                          <span className={`text-xs px-2 py-1 rounded ${
                            item.type === 'technical' 
                              ? 'bg-cyan-500/20 text-cyan-400' 
                              : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {item.type === 'technical' ? 'Technical' : 'Course'}
                          </span>
                        </div>
                        <p className="text-slate-300 mb-2">{item.definition}</p>
                        
                        {item.type === 'technical' && (
                          <>
                            <div className="mt-3 p-3 bg-slate-800/50 rounded border-l-4 border-cyan-400">
                              <p className="text-sm text-slate-300">
                                <span className="font-semibold text-cyan-400">🏥 Medical Analogy:</span> {item.analogy}
                              </p>
                            </div>
                            <p className="text-slate-400 text-sm mt-2">
                              <span className="font-semibold">💡 Why it matters:</span> {item.whyItMatters}
                            </p>
                            {item.relatedTerms && item.relatedTerms.length > 0 && (
                              <p className="text-slate-400 text-sm mt-2">
                                <span className="font-semibold">🔗 Related:</span> {item.relatedTerms.join(', ')}
                              </p>
                            )}
                          </>
                        )}
                        
                        {item.modules && (
                          <p className="text-slate-400 text-sm mt-2">
                            <span className="font-semibold">📚 Used in:</span> {item.modules.join(', ')}
                          </p>
                        )}
                        
                        {item.usedInModules && (
                          <p className="text-slate-400 text-sm mt-2">
                            <span className="font-semibold">📚 Used in:</span> {item.usedInModules.join(', ')}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Back to Learning Button */}
          <div className="mt-8 text-center">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Back to Learning →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlossaryView;

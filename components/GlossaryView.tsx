import { useMemo, useState } from 'react';
import { CURRICULUM, CURRICULUM_MEDICAL } from '../constants';
import { TECH_GLOSSARY, searchGlossary } from '../glossaryData';

const GlossaryView = ({ onClose }: { onClose: () => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'technical' | 'course'>('all');
  const [selectedLetter, setSelectedLetter] = useState<string>('');

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

    // Filter by selected letter if any
    if (selectedLetter) {
      terms = terms.filter(t => t.term[0].toUpperCase() === selectedLetter);
    }

    return terms.sort((a, b) => a.term.localeCompare(b.term));
  }, [searchTerm, filter, courseGlossaryTerms, selectedLetter]);

  // Get all unique first letters
  const allLetters = useMemo(() => {
    const letters = new Set<string>();
    [...TECH_GLOSSARY, ...courseGlossaryTerms].forEach(term => {
      letters.add(term.term[0].toUpperCase());
    });
    return Array.from(letters).sort();
  }, [courseGlossaryTerms]);

  return (
    <div className="fixed inset-0 bg-slate-900 z-50 flex">
      {/* Sidebar - Alphabetical Navigation */}
      <aside className="w-80 flex-shrink-0 bg-slate-800/50 border-r border-slate-700/50 flex flex-col">
        <header className="p-6 border-b border-slate-700/50">
          <h1 className="text-2xl font-bold text-white mb-1">📖 Glossary</h1>
          <p className="text-slate-400 text-sm">AI & Medical Terms</p>
          <div className="mt-2 text-xs text-slate-400">
            {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''}
          </div>
        </header>
        
        {/* Search and Filter */}
        <div className="p-4 border-b border-slate-700/50 space-y-3">
          <input
            type="text"
            placeholder="Search terms..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-400 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-cyan-500 transition-all"
          />
          <select
            value={filter}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilter(e.target.value as any)}
            className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-cyan-500 transition-all"
          >
            <option value="all">All Terms</option>
            <option value="technical">Technical Terms</option>
            <option value="course">Course Terms</option>
          </select>
        </div>

        {/* Alphabetical Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            <button
              onClick={() => setSelectedLetter('')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                selectedLetter === ''
                  ? 'bg-cyan-600 text-white font-semibold'
                  : 'text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              All Letters
            </button>
            {allLetters.map(letter => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                  selectedLetter === letter
                    ? 'bg-cyan-600 text-white font-semibold'
                    : 'text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                {letter}
              </button>
            ))}
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
        {filteredTerms.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg">No terms found matching "{searchTerm}"</p>
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl">
            {filteredTerms.map((item) => (
              <div key={item.term} className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:bg-slate-800/70 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-white font-bold text-2xl">{item.term}</h3>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    item.type === 'technical' 
                      ? 'bg-cyan-500/20 text-cyan-400' 
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {item.type === 'technical' ? 'Technical' : 'Course'}
                  </span>
                </div>
                <p className="text-slate-300 text-base leading-relaxed mb-4">{item.definition}</p>
                
                {item.type === 'technical' && (
                  <>
                    <div className="mt-4 p-4 bg-cyan-500/10 rounded-lg border-l-4 border-cyan-400">
                      <p className="text-sm text-slate-300">
                        <span className="font-semibold text-cyan-400">🏥 Medical Analogy:</span> {item.analogy}
                      </p>
                    </div>
                    <p className="text-slate-400 text-sm mt-3">
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
                  <p className="text-slate-400 text-sm mt-3">
                    <span className="font-semibold">📚 Used in:</span> {item.modules.join(', ')}
                  </p>
                )}
                
                {item.usedInModules && (
                  <p className="text-slate-400 text-sm mt-3">
                    <span className="font-semibold">📚 Used in:</span> {item.usedInModules.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default GlossaryView;

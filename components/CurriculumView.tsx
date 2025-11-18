import { useState } from 'react';
import { Module, UserProgress } from '../types';
import { CheckCircleIcon, LockClosedIcon, PlayCircleIcon, SparklesIcon, ChevronDownIcon, ChevronRightIcon } from './Icons';

interface CurriculumViewProps {
  curriculum: Module[];
  progress: UserProgress;
  currentLessonId: string | null;
  isLessonUnlocked: (lessonId: string) => boolean;
  onSelectLesson: (lessonId: string) => void;
}

const CurriculumView: React.FC<CurriculumViewProps> = ({
  curriculum,
  progress,
  currentLessonId,
  isLessonUnlocked,
  onSelectLesson,
}) => {
  // Track which modules are expanded
  const [expandedModules, setExpandedModules] = useState<Set<string>>(() => {
    // Auto-expand current module and incomplete modules
    const expanded = new Set<string>();
    curriculum.forEach(module => {
      const hasCurrentLesson = module.lessons.some(l => l.id === currentLessonId);
      const isComplete = module.lessons.every(l => progress.completedLessons.has(l.id));
      const hasProgress = module.lessons.some(l => progress.completedLessons.has(l.id));
      
      if (hasCurrentLesson || (!isComplete && hasProgress) || (!isComplete && !hasProgress && curriculum.indexOf(module) === 0)) {
        expanded.add(module.id);
      }
    });
    return expanded;
  });

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => {
      const next = new Set(prev);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      return next;
    });
  };

  return (
    <nav className="space-y-2 flex-1 overflow-y-auto pr-2 -mr-4">
      {curriculum.map((module, moduleIndex) => {
        const isExpanded = expandedModules.has(module.id);
        const completedLessons = module.lessons.filter(l => progress.completedLessons.has(l.id)).length;
        const totalLessons = module.lessons.length;
        const isComplete = completedLessons === totalLessons;
        const hasCurrentLesson = module.lessons.some(l => l.id === currentLessonId);
        const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

        // Determine module status
        let moduleStatus: 'completed' | 'current' | 'locked' = 'locked';
        if (isComplete) {
          moduleStatus = 'completed';
        } else if (completedLessons > 0 || hasCurrentLesson) {
          moduleStatus = 'current';
        } else if (moduleIndex === 0) {
          moduleStatus = 'current';
        } else {
          const prevModule = curriculum[moduleIndex - 1];
          const prevComplete = prevModule.lessons.every(l => progress.completedLessons.has(l.id));
          if (prevComplete) moduleStatus = 'current';
        }

        return (
          <div key={module.id} className="mb-4">
            {/* Module Header - Clickable to expand/collapse */}
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full text-left group"
            >
              <div className={`flex items-center gap-2 p-3 rounded-lg transition-all ${
                moduleStatus === 'completed' ? 'bg-green-500/10 border border-green-500/20' :
                moduleStatus === 'current' ? 'bg-cyan-500/10 border border-cyan-500/20' :
                'bg-slate-800/50 border border-slate-700/50'
              }`}>
                {/* Expand/Collapse Icon */}
                <div className="text-slate-400">
                  {isExpanded ? (
                    <ChevronDownIcon className="w-4 h-4" />
                  ) : (
                    <ChevronRightIcon className="w-4 h-4" />
                  )}
                </div>

                {/* Status Icon */}
                <div className={`text-2xl ${
                  moduleStatus === 'completed' ? 'text-green-400' :
                  moduleStatus === 'current' ? 'text-cyan-400' :
                  'text-slate-600'
                }`}>
                  {moduleStatus === 'completed' ? '✅' :
                   moduleStatus === 'current' ? '📍' : '🔒'}
                </div>

                {/* Module Info */}
                <div className="flex-1 min-w-0">
                  <h2 className={`text-sm font-bold tracking-tight truncate ${
                    moduleStatus === 'completed' ? 'text-green-400' :
                    moduleStatus === 'current' ? 'text-cyan-400' :
                    'text-slate-500'
                  }`}>
                    {module.title}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-slate-400">
                      {completedLessons}/{totalLessons} lessons
                    </p>
                    {moduleStatus === 'current' && !isComplete && (
                      <div className="flex-1 max-w-[80px]">
                        <div className="w-full bg-slate-700 rounded-full h-1">
                          <div 
                            className="bg-cyan-400 h-1 rounded-full transition-all"
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </button>

            {/* Module Lessons - Collapsible */}
            {isExpanded && (
              <ul className="space-y-1 mt-2 ml-4 border-l-2 border-slate-700/50 animate-fade-in">
                {module.lessons.map((lesson, lessonIndex) => {
                  const isCompleted = progress.completedLessons.has(lesson.id);
                  const isCurrent = lesson.id === currentLessonId;
                  const isUnlocked = isLessonUnlocked(lesson.id);

                  let statusIcon;
                  if (isCompleted) {
                    statusIcon = (
                      <div className="w-6 h-6 flex items-center justify-center bg-green-500/10 rounded-full">
                        <CheckCircleIcon className="w-5 h-5 text-green-400" />
                      </div>
                    );
                  } else if (isCurrent) {
                    statusIcon = (
                      <div className="w-6 h-6 flex items-center justify-center bg-cyan-500/10 rounded-full">
                        <PlayCircleIcon className="w-5 h-5 text-cyan-400 animate-pulse" />
                      </div>
                    );
                  } else if (!isUnlocked) {
                    statusIcon = (
                      <div className="w-6 h-6 flex items-center justify-center bg-slate-800 rounded-full">
                        <LockClosedIcon className="w-4 h-4 text-slate-600" />
                      </div>
                    );
                  } else {
                    statusIcon = (
                      <div className="w-6 h-6 flex items-center justify-center bg-slate-700/50 rounded-full">
                        <SparklesIcon className="w-4 h-4 text-slate-400" />
                      </div>
                    );
                  }

                  const baseClasses = "flex items-center gap-3 rounded-md transition-colors text-sm w-full text-left pl-4 py-2 -ml-[13px] border-l-2";
                  const stateClasses = isUnlocked
                    ? isCurrent
                      ? "border-cyan-400 bg-slate-800/50 text-white font-semibold"
                      : "border-transparent text-slate-400 hover:bg-slate-800 hover:text-white"
                    : "border-transparent text-slate-600 cursor-not-allowed";

                  return (
                    <li key={lesson.id}>
                      <button
                        onClick={() => onSelectLesson(lesson.id)}
                        disabled={!isUnlocked}
                        className={`${baseClasses} ${stateClasses}`}
                        aria-current={isCurrent ? 'page' : undefined}
                      >
                        {statusIcon}
                        <span className="flex-1 truncate">{lesson.title}</span>
                        {lesson.estimatedTimeMinutes && (
                          <span className="text-xs text-slate-500">
                            {lesson.estimatedTimeMinutes}m
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default CurriculumView;

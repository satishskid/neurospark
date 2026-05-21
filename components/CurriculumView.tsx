
import React from 'react';
import { Module, UserProgress } from '../types';
import { CheckCircleIcon, LockClosedIcon, PlayCircleIcon, SparklesIcon } from './Icons';

interface CurriculumViewProps {
  curriculum: Module[];
  progress: UserProgress;
  currentLessonId: string | null;
  isLessonUnlocked: (lessonId: string) => boolean;
  onSelectLesson: (lessonId:string) => void;
  isUserAdmin: boolean;
}

const CurriculumView: React.FC<CurriculumViewProps> = ({
  curriculum,
  progress,
  currentLessonId,
  isLessonUnlocked,
  onSelectLesson,
  isUserAdmin,
}) => {
  return (
    <nav className="space-y-8 flex-1 overflow-y-auto pr-2 -mr-4">
      {curriculum.map((module) => {
        const totalCount = module.lessons.length;
        const completedCount = module.lessons.filter(l => progress.completedLessons.has(l.id)).length;

        return (
          <div key={module.id}>
            <div className="flex justify-between items-baseline mb-1">
              <h2 className="text-sm font-bold text-slate-300 tracking-tight">
                {module.title}
              </h2>
              <span className="text-xs font-semibold text-slate-500">{completedCount} / {totalCount}</span>
            </div>
            <p className="text-xs text-slate-500 mb-3">{module.description}</p>
            <ul className="space-y-1 border-l-2 border-slate-700/50">
              {module.lessons.map((lesson) => {
                const isCompleted = progress.completedLessons.has(lesson.id);
                const isCurrent = lesson.id === currentLessonId;
                const isUnlocked = isUserAdmin || isLessonUnlocked(lesson.id);

                let statusIcon;
                if (isCompleted) {
                  statusIcon = <div className="w-6 h-6 flex items-center justify-center bg-green-500/10 rounded-full"><CheckCircleIcon className="w-5 h-5 text-green-400" /></div>;
                } else if (isCurrent) {
                  statusIcon = <div className="w-6 h-6 flex items-center justify-center bg-cyan-500/10 rounded-full"><PlayCircleIcon className="w-5 h-5 text-cyan-400 animate-pulse" /></div>;
                } else if (!isUnlocked) {
                   statusIcon = <div className="w-6 h-6 flex items-center justify-center bg-slate-800 rounded-full"><LockClosedIcon className="w-4 h-4 text-slate-600" /></div>;
                } else {
                  statusIcon = <div className="w-6 h-6 flex items-center justify-center bg-slate-700/50 rounded-full"><SparklesIcon className="w-4 h-4 text-slate-400" /></div>
                }

                const baseClasses = "flex items-center gap-3 rounded-md transition-all duration-300 text-sm w-full text-left pl-4 py-2 -ml-[13px] border-l-2";
                let stateClasses = "";
                
                if (!isUnlocked) {
                  stateClasses = "border-transparent text-slate-600 cursor-not-allowed opacity-50 bg-slate-900/10";
                } else if (isCurrent) {
                  stateClasses = "border-cyan-400 bg-slate-800/50 text-white font-semibold ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-900";
                } else if (isCompleted) {
                  stateClasses = "border-transparent text-slate-200 bg-green-900 bg-green-900/20 hover:bg-green-900/30";
                } else {
                  stateClasses = "border-transparent text-slate-400 hover:bg-slate-800 hover:text-white";
                }

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
                        <span className="text-xs text-slate-500 font-medium ml-2 flex-shrink-0 bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700/50">{lesson.estimatedTimeMinutes}m</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
};

export default CurriculumView;

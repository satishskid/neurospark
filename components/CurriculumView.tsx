
import React from 'react';
import { Module, UserProgress } from '../types';
import { CheckCircleIcon, LockClosedIcon, PlayCircleIcon, SparklesIcon } from './Icons';

interface CurriculumViewProps {
  curriculum: Module[];
  progress: UserProgress;
  currentLessonId: string | null;
  isLessonUnlocked: (lessonId: string) => boolean;
  onSelectLesson: (lessonId:string) => void;
}

const CurriculumView: React.FC<CurriculumViewProps> = ({
  curriculum,
  progress,
  currentLessonId,
  isLessonUnlocked,
  onSelectLesson,
}) => {
  return (
    <nav className="space-y-8 flex-1 overflow-y-auto pr-2 -mr-4">
      {curriculum.map((module, moduleIndex) => (
        <div key={module.id}>
          <h2 className="text-sm font-bold text-slate-300 tracking-tight">
            {module.title}
          </h2>
          <p className="text-xs text-slate-500 mb-3">{module.description}</p>
          <ul className="space-y-1 border-l-2 border-slate-700/50">
            {module.lessons.map((lesson, lessonIndex) => {
              const isCompleted = progress.completedLessons.has(lesson.id);
              const isCurrent = lesson.id === currentLessonId;
              const isUnlocked = isLessonUnlocked(lesson.id);

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
                    <span className="flex-1">{lesson.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
};

export default CurriculumView;

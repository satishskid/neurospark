import React, { useState } from 'react';
import { CURRICULUM_MEDICAL } from '../constants';
import { Module, Lesson } from '../types';
import { 
  BookOpenIcon, 
  PencilSquareIcon, 
  CheckCircleIcon,
  ClockIcon,
  AcademicCapIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from './Icons';

const CurriculumManagementPanel: React.FC = () => {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [selectedLesson, setSelectedLesson] = useState<{ moduleId: string; lessonId: string } | null>(null);

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const getTotalTime = (module: Module): number => {
    return module.lessons.reduce((sum, lesson) => sum + (lesson.estimatedTimeMinutes || 0), 0);
  };

  const getLessonTypeIcon = (type: string) => {
    switch (type) {
      case 'quiz':
        return '📝';
      case 'exercise':
        return '✍️';
      case 'content':
        return '📖';
      default:
        return '📄';
    }
  };

  const totalModules = CURRICULUM_MEDICAL.length;
  const totalLessons = CURRICULUM_MEDICAL.reduce((sum, m) => sum + m.lessons.length, 0);
  const totalMinutes = CURRICULUM_MEDICAL.reduce((sum, m) => sum + getTotalTime(m), 0);
  const totalQuizzes = CURRICULUM_MEDICAL.reduce((sum, m) => 
    sum + m.lessons.filter(l => l.type === 'quiz').length, 0
  );
  const totalExercises = CURRICULUM_MEDICAL.reduce((sum, m) => 
    sum + m.lessons.filter(l => l.type === 'exercise').length, 0
  );

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
          <div className="flex items-center gap-3">
            <BookOpenIcon className="w-8 h-8 text-cyan-400" />
            <div>
              <p className="text-slate-400 text-sm">Modules</p>
              <p className="text-2xl font-bold text-white">{totalModules}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
          <div className="flex items-center gap-3">
            <AcademicCapIcon className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-slate-400 text-sm">Lessons</p>
              <p className="text-2xl font-bold text-white">{totalLessons}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
          <div className="flex items-center gap-3">
            <ClockIcon className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-slate-400 text-sm">Total Time</p>
              <p className="text-2xl font-bold text-white">{Math.round(totalMinutes / 60)}h</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📝</span>
            <div>
              <p className="text-slate-400 text-sm">Quizzes</p>
              <p className="text-2xl font-bold text-white">{totalQuizzes}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
          <div className="flex items-center gap-3">
            <span className="text-3xl">✍️</span>
            <div>
              <p className="text-slate-400 text-sm">Exercises</p>
              <p className="text-2xl font-bold text-white">{totalExercises}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum Tree */}
      <div className="bg-slate-800/50 rounded-lg border border-slate-700/50">
        <div className="p-4 border-b border-slate-700/50">
          <h3 className="text-lg font-semibold text-white">Curriculum Structure</h3>
          <p className="text-sm text-slate-400">View and manage course content</p>
        </div>

        <div className="p-4 space-y-2">
          {CURRICULUM_MEDICAL.map((module, moduleIndex) => {
            const isExpanded = expandedModules.has(module.id);
            const moduleTime = getTotalTime(module);

            return (
              <div key={module.id} className="border border-slate-700/50 rounded-lg overflow-hidden">
                {/* Module Header */}
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full flex items-center justify-between p-4 bg-slate-800/30 hover:bg-slate-700/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {isExpanded ? (
                      <ChevronDownIcon className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronRightIcon className="w-5 h-5 text-slate-400" />
                    )}
                    <div className="text-left">
                      <h4 className="font-semibold text-white">{module.title}</h4>
                      <p className="text-sm text-slate-400">{module.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-slate-400">{module.lessons.length} lessons</p>
                      <p className="text-xs text-slate-500">{moduleTime} min</p>
                    </div>
                    <CheckCircleIcon className="w-5 h-5 text-green-400" />
                  </div>
                </button>

                {/* Lessons List */}
                {isExpanded && (
                  <div className="bg-slate-900/50 divide-y divide-slate-700/30">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lesson.id}
                        className="p-3 hover:bg-slate-800/30 transition-colors cursor-pointer"
                        onClick={() => setSelectedLesson({ moduleId: module.id, lessonId: lesson.id })}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{getLessonTypeIcon(lesson.type)}</span>
                            <div>
                              <p className="text-sm font-medium text-white">{lesson.title}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs px-2 py-0.5 rounded bg-slate-700/50 text-slate-300">
                                  {lesson.type}
                                </span>
                                {lesson.estimatedTimeMinutes && (
                                  <span className="text-xs text-slate-400">
                                    {lesson.estimatedTimeMinutes} min
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <button
                            className="p-2 hover:bg-slate-700/50 rounded transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Edit functionality would go here
                            }}
                          >
                            <PencilSquareIcon className="w-4 h-4 text-slate-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Lesson Preview */}
      {selectedLesson && (
        <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Lesson Preview</h3>
          <div className="bg-slate-900/50 rounded p-4">
            <p className="text-slate-400 text-sm">
              Lesson editing interface would appear here. This would allow admins to:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>• Edit lesson content and descriptions</li>
              <li>• Modify quiz questions and answers</li>
              <li>• Update exercise prompts and evaluation criteria</li>
              <li>• Adjust time estimates</li>
              <li>• Add or remove glossary terms</li>
              <li>• Preview changes before publishing</li>
            </ul>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors">
          Export Curriculum
        </button>
        <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
          Import Updates
        </button>
        <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
          Version History
        </button>
      </div>
    </div>
  );
};

export default CurriculumManagementPanel;

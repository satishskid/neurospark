/**
 * Curriculum Selection Component
 * Allows users to choose between Foundational AI and Medical AI curricula
 */

import React from 'react';
import { AcademicCapIcon, HeartIcon } from './Icons';

interface CurriculumOption {
  id: 'foundational' | 'medical';
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  duration: string;
  modules: number;
  lessons: number;
  color: string;
}

const curricula: CurriculumOption[] = [
  {
    id: 'foundational',
    title: 'Foundational AI',
    subtitle: 'For All Professionals',
    description: 'Master AI fundamentals with broad applications across industries. Perfect for business professionals, educators, and anyone wanting to understand and leverage AI effectively.',
    icon: <AcademicCapIcon className="w-16 h-16" />,
    features: [
      'Comprehensive AI fundamentals',
      'Practical prompt engineering',
      'Real-world applications',
      'Ethics & responsible AI',
      'Advanced techniques',
      'Tool ecosystem overview',
      'Hands-on projects',
      'Industry-agnostic examples'
    ],
    duration: '12-15 hours',
    modules: 10,
    lessons: 44,
    color: 'blue'
  },
  {
    id: 'medical',
    title: 'Medical AI',
    subtitle: 'For Healthcare Professionals',
    description: 'Specialized curriculum designed for physicians, nurses, and healthcare providers. Learn to integrate AI into clinical practice while maintaining patient safety and privacy.',
    icon: <HeartIcon className="w-16 h-16" />,
    features: [
      'Clinical AI applications',
      'HIPAA compliance & privacy',
      'Patient safety focus',
      'Medical case studies',
      'EHR integration',
      'Clinical decision support',
      'Healthcare workflows',
      'Evidence-based practice'
    ],
    duration: '10-12 hours',
    modules: 7,
    lessons: 44,
    color: 'cyan'
  }
];

export const CurriculumSelector = ({ onSelect }: {
  onSelect: (curriculum: 'foundational' | 'medical') => void;
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Learning Path
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Select the curriculum that best fits your professional goals. Both tracks offer comprehensive, 
            publication-quality content with interactive exercises and real-world applications.
          </p>
          <p className="text-sm text-slate-400 mt-4">
            You can switch between curricula at any time and complete both for Master certification.
          </p>
        </div>

        {/* Curriculum Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {curricula.map((curriculum) => (
            <div
              key={curriculum.id}
              className={`bg-slate-800/50 border-2 ${
                curriculum.color === 'blue' ? 'border-blue-500' : 'border-cyan-500'
              } rounded-2xl p-8 hover:scale-105 transition-transform duration-300 cursor-pointer`}
              onClick={() => onSelect(curriculum.id)}
            >
              {/* Icon & Title */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`${
                  curriculum.color === 'blue' ? 'text-blue-400' : 'text-cyan-400'
                }`}>
                  {curriculum.icon}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{curriculum.title}</h2>
                  <p className={`text-sm ${
                    curriculum.color === 'blue' ? 'text-blue-400' : 'text-cyan-400'
                  } font-medium`}>
                    {curriculum.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-300 leading-relaxed mb-6">
                {curriculum.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-slate-700/30 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{curriculum.modules}</div>
                  <div className="text-xs text-slate-400">Modules</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{curriculum.lessons}</div>
                  <div className="text-xs text-slate-400">Lessons</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{curriculum.duration}</div>
                  <div className="text-xs text-slate-400">Duration</div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-white mb-3">What You'll Learn:</h3>
                <ul className="space-y-2">
                  {curriculum.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className={`${
                        curriculum.color === 'blue' ? 'text-blue-400' : 'text-cyan-400'
                      } mt-0.5`}>
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => onSelect(curriculum.id)}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 ${
                  curriculum.color === 'blue'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600'
                    : 'bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600'
                } shadow-lg hover:shadow-xl`}
              >
                Start {curriculum.title} →
              </button>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 text-sm">
            Both curricula include interactive quizzes, case studies, practical exercises, and certificates upon completion.
          </p>
          <p className="text-slate-500 text-xs mt-2">
            Complete both tracks to earn the "AI Master" certification.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurriculumSelector;

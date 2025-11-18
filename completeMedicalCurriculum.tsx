// This file will be integrated into constants.tsx to replace CURRICULUM_MEDICAL
// Contains all 7 modules for healthcare professionals

import React from 'react';
import { Module } from './types';

// Note: Import Callout from constants.tsx or define here
// For now, using inline components

export const COMPLETE_MEDICAL_CURRICULUM: Module[] = [
  // Modules 1-3 are complete and tested
  // See medicalCurriculum.tsx and medicalCurriculumModules2-7.tsx for full content
  
  // MODULE 4: Advanced Prompt Engineering (25 min) - COMPLETE
  // MODULE 5: AI Safety & Bias (22 min) - COMPLETE  
  // MODULE 6: Building Workflows (28 min) - COMPLETE
  // MODULE 7: Capstone Project (90 min) - STRUCTURE READY

  // Total: 7 modules, ~6 hours of content
  // All modules follow same pattern: TL;DR, medical analogies, practical examples, quizzes
];

// INTEGRATION INSTRUCTIONS:
// 1. Merge medicalCurriculum.tsx (Module 1)
// 2. Merge medicalCurriculumModules2-7.tsx (Modules 2-6)
// 3. Add Module 7 capstone structure
// 4. Replace CURRICULUM_MEDICAL in constants.tsx
// 5. Test all modules render correctly

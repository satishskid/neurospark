import { MEDICAL_CURRICULUM_ENHANCED } from './medicalCurriculum';
import { MEDICAL_MODULES_2_TO_7 } from './medicalCurriculumModules2-7';
import { Module } from './types';

// Complete medical curriculum with all 7 modules
export const MEDICAL_CURRICULUM_COMPLETE: Module[] = [
  ...MEDICAL_CURRICULUM_ENHANCED,  // Module 1
  ...MEDICAL_MODULES_2_TO_7        // Modules 2-7
];

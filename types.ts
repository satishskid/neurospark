export interface User {
  uid: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
  sessionRecovered?: boolean;
  isAdmin?: boolean;
  createdAt?: string;
  updatedAt?: string;
  userPersona?: string | null;
  courseMode?: string | null;
  userProfession?: string | null;
  currentLevelIndex?: number;
  totalPoints?: number;
  achievedBadgeIds?: string[];
  completedSteps?: Record<string, boolean>;
  theme?: string;
  analogyTheme?: string | null;
  // Course access control fields
  allowedCourses?: string[]; // ['masterchef', 'medical', 'both']
  courseProgress?: Record<string, CourseProgress>; // Progress per course
}

export interface Lesson {
  id: string;
  title: string;
  type: 'content' | 'quiz' | 'exercise';
  content?: React.ReactNode;
  quiz?: QuizData;
  exercise?: ExerciseData;
  referenceText?: string;
  furtherReading?: { label: string; url: string }[];
  footnotes?: string[];
  glossary?: { term: string; definition: string }[];
  checkPrompts?: string[];
  learningObjectives?: string[];
  estimatedTimeMinutes: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface CourseProgress {
  completedLessons: string[];
  currentModuleIndex: number;
  totalScore: number;
  lastAccessed: string;
  certificateEarned?: boolean;
}

export interface QuizData {
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation?: string; // For explanatory feedback
    questionType?: 'mcq' | 'explanatory'; // New question types
    maxAttempts?: number; // For 3-attempt system
  }[];
}

export interface ExerciseData {
  prompt: React.ReactNode;
  evaluationPrompt: string;
  initialCode?: string;
}

export interface UserProgress {
  completedLessons: Set<string>;
  userName: string | null;
  tutorialCompleted: boolean;
}

export type AppView = 'onboarding' | 'curriculum-select' | 'login' | 'journey' | 'certificate' | 'tutorial' | 'syllabus' | 'dashboard' | 'glossary' | 'capstone' | 'sessions' | 'admin-login';

export interface ChatHistoryItem {
  role: 'user' | 'model';
  content: string;
}

// Performance tracking for adaptive learning
export interface PerformanceMetrics {
  userId: string;
  quizScores: Record<string, number>; // moduleId -> score percentage
  exerciseAttempts: Record<string, number>; // lessonId -> number of attempts
  tutorInteractions: number;
  timeSpentPerLesson: Record<string, number>; // lessonId -> minutes
  strugglingConcepts: string[]; // topics with low scores
  completionDate?: string;
  certificateEarned?: boolean;
  lastUpdated: string;
}

// Technical glossary terms
export interface TechTerm {
  term: string;
  definition: string;
  analogy: string; // Medical analogy
  whyItMatters: string;
  relatedTerms: string[];
  usedInModules: string[]; // Module IDs where this term appears
}

// Admin dashboard - Whitelisted users
export interface WhitelistedUser {
  email: string;
  name: string;
  role: 'Physician' | 'Resident' | 'Nurse' | 'NursePractitioner' | 'Admin' | 'Other';
  institution: string;
  addedDate: string;
  status: 'active' | 'pending' | 'inactive';
  addedBy: string; // admin email
}

// Admin dashboard - System logs
export interface SystemLog {
  id: string;
  timestamp: string;
  severity: 'error' | 'warning' | 'info';
  component: string;
  message: string;
  userId?: string;
  metadata?: any;
}

// Admin dashboard - Curriculum version
export interface CurriculumVersion {
  version: number;
  publishedAt: string;
  publishedBy: string;
  curriculum: Module[];
  changeLog: string;
}

// Quiz mode
export type QuizMode = 'study' | 'test';

// Exercise attempt tracking
export interface ExerciseAttempt {
  lessonId: string;
  attemptNumber: number;
  userInput: string;
  feedback: string;
  isCorrect: boolean;
  timestamp: string;
}
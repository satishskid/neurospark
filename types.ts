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

export type AppView = 'onboarding' | 'login' | 'journey' | 'certificate' | 'tutorial' | 'syllabus';

export interface ChatHistoryItem {
  role: 'user' | 'model';
  content: string;
}
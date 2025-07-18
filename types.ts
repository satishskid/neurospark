export interface User {
  uid: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
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
}

export interface Lesson {
  id: string;
  title: string;
  type: 'content' | 'quiz' | 'exercise';
  content?: React.ReactNode;
  quiz?: QuizData;
  exercise?: ExerciseData;
  estimatedTimeMinutes: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface QuizData {
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
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

export type AppView = 'onboarding' | 'login' | 'journey' | 'certificate' | 'tutorial';

export interface ChatHistoryItem {
  role: 'user' | 'model';
  content: string;
}
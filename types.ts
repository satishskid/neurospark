
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

export type AppView = 'onboarding' | 'journey' | 'certificate' | 'tutorial';

export interface ChatHistoryItem {
  role: 'user' | 'model';
  content: string;
}
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock the Gemini API for testing
vi.mock('./services/geminiService', () => ({
  evaluateExercise: vi.fn().mockResolvedValue({
    isCorrect: true,
    feedback: 'Great job! This is a test response.'
  }),
  getChatbotResponse: vi.fn().mockResolvedValue('This is a test chatbot response.')
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

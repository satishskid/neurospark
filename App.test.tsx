import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { authService } from './services/firebaseService';
import { dbService } from './services/dbService';

// Mock firebaseConfig
vi.mock('./firebaseConfig', () => ({
  auth: {
    currentUser: {
      uid: 'test-uid',
      email: 'test@example.com',
      displayName: 'Test User'
    }
  },
  db: {}
}));

// Mock firebaseService
vi.mock('./services/firebaseService', () => {
  const mockUnsubscribe = vi.fn();
  return {
    authService: {
      signInWithEmail: vi.fn(),
      signInWithGoogle: vi.fn(),
      signOut: vi.fn(),
      onAuthStateChanged: vi.fn().mockImplementation((cb) => {
        // Start as not logged in by default
        cb(null);
        return mockUnsubscribe;
      })
    }
  };
});

// Mock dbService
vi.mock('./services/dbService', () => ({
  dbService: {
    findUser: vi.fn().mockResolvedValue(null),
    createUser: vi.fn().mockResolvedValue({}),
    updateUser: vi.fn().mockResolvedValue({}),
    isUserWhitelisted: vi.fn().mockResolvedValue(true),
    getAllUsersProgress: vi.fn().mockResolvedValue([])
  }
}));

// Mock the Gemini service to avoid real API calls
vi.mock('./services/geminiService', () => ({
  evaluateExercise: vi.fn().mockResolvedValue({
    isCorrect: true,
    feedback: 'Great job! This is a test response.'
  }),
  getChatbotResponse: vi.fn().mockResolvedValue('This is a test chatbot response.')
}));

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    
    // Set default onAuthStateChanged behavior (not logged in)
    vi.mocked(authService.onAuthStateChanged).mockImplementation((cb: any) => {
      cb(null);
      return vi.fn();
    });
  });

  it('renders onboarding screen initially', () => {
    render(<App />);
    
    expect(screen.getAllByText(/GreyWaken/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Awaken Your AI Potential/i)).toBeInTheDocument();
    expect(screen.getByText(/Get Started/i)).toBeInTheDocument();
  });

  it('allows user to transition from onboarding to login screen', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const getStartedButton = screen.getByText(/Get Started/i);
    await user.click(getStartedButton);
    
    // Should show login screen with Google sign-in options
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in with Google/i)).toBeInTheDocument();
  });

  it('allows starting journey via Google Sign-In and completing tutorial', async () => {
    const user = userEvent.setup();
    
    // Mock successful sign in
    vi.mocked(authService.signInWithGoogle).mockResolvedValue({
      uid: 'test-uid',
      name: 'Test User',
      email: 'test@example.com',
      isLoggedIn: true
    });
    
    vi.mocked(dbService.findUser).mockResolvedValue({
      uid: 'test-uid',
      name: 'Test User',
      email: 'test@example.com',
      isLoggedIn: true
    });
    
    render(<App />);
    
    // Navigate to login
    await user.click(screen.getByText(/Get Started/i));
    
    // Trigger auth change to simulate successful login
    vi.mocked(authService.onAuthStateChanged).mockImplementationOnce((cb: any) => {
      cb({
        uid: 'test-uid',
        name: 'Test User',
        email: 'test@example.com',
        isLoggedIn: true
      });
      return vi.fn();
    });
    
    // Click sign in
    await user.click(screen.getByText(/Sign in with Google/i));
    
    // Should show tutorial overlay
    await waitFor(() => {
      expect(screen.getByText(/Welcome to Your AI Journey!/i)).toBeInTheDocument();
      expect(screen.getByText(/Let's Begin!/i)).toBeInTheDocument();
    });
    
    // Click "Let's Begin!" to complete tutorial and show dashboard
    await user.click(screen.getByText(/Let's Begin!/i));
    
    await waitFor(() => {
      expect(screen.getByText(/Your Journey/i)).toBeInTheDocument();
    });
  });

  it('loads saved progress from localStorage directly into journey view', async () => {
    // Mock saved progress in localStorage
    const savedProgress = {
      completedLessons: ['1-1'],
      userName: 'Saved User',
      tutorialCompleted: true,
      currentLessonId: '1-2'
    };
    localStorage.getItem.mockReturnValue(JSON.stringify(savedProgress));
    
    // Mock user already logged in via AuthState
    vi.mocked(authService.onAuthStateChanged).mockImplementation((cb: any) => {
      cb({
        uid: 'test-uid',
        name: 'Saved User',
        email: 'test@example.com',
        isLoggedIn: true
      });
      return vi.fn();
    });
    
    vi.mocked(dbService.findUser).mockResolvedValue({
      uid: 'test-uid',
      name: 'Saved User',
      email: 'test@example.com',
      isLoggedIn: true,
      completedSteps: { '1-1': true }
    });
    
    render(<App />);
    
    // Should skip onboarding/tutorial and show main journey
    await waitFor(() => {
      expect(screen.getByText(/Your Journey/i)).toBeInTheDocument();
    });
  });

  it('handles localStorage parsing errors gracefully', () => {
    localStorage.getItem.mockReturnValue('invalid json');
    
    render(<App />);
    expect(screen.getAllByText(/GreyWaken/i)[0]).toBeInTheDocument();
  });

  it('calculates progress percentage and remaining time correctly in dashboard', async () => {
    // Mock user and progress
    const savedProgress = {
      completedLessons: [],
      userName: 'Fresh User',
      tutorialCompleted: true,
      currentLessonId: '1-1'
    };
    localStorage.getItem.mockReturnValue(JSON.stringify(savedProgress));
    
    vi.mocked(authService.onAuthStateChanged).mockImplementation((cb: any) => {
      cb({
        uid: 'test-uid',
        name: 'Fresh User',
        email: 'test@example.com',
        isLoggedIn: true
      });
      return vi.fn();
    });
    
    vi.mocked(dbService.findUser).mockResolvedValue({
      uid: 'test-uid',
      name: 'Fresh User',
      email: 'test@example.com',
      isLoggedIn: true,
      completedSteps: {}
    });
    
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText(/0% Complete/i)).toBeInTheDocument();
      expect(screen.getByText(/in module/i)).toBeInTheDocument();
      expect(screen.getByText(/total/i)).toBeInTheDocument();
    });
  });
});

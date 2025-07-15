import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('renders onboarding screen initially', () => {
    render(<App />);
    
    expect(screen.getByText(/Tickle Your Grey Matter/i)).toBeInTheDocument();
    expect(screen.getByText(/Master the Power of AI/i)).toBeInTheDocument();
  });

  it('allows user to start journey with name input', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const nameInput = screen.getByPlaceholderText(/Enter your name/i);
    const startButton = screen.getByText(/Start Your AI Journey/i);
    
    await user.type(nameInput, 'Test User');
    await user.click(startButton);
    
    // Should show tutorial view
    await waitFor(() => {
      expect(screen.getByText(/Your Journey/i)).toBeInTheDocument();
    });
  });

  it('validates name input before starting journey', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const startButton = screen.getByText(/Start Your AI Journey/i);
    
    // Try to start without entering name
    await user.click(startButton);
    
    // Should still be on onboarding screen
    expect(screen.getByText(/Tickle Your Grey Matter/i)).toBeInTheDocument();
  });

  it('persists progress in localStorage', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const nameInput = screen.getByPlaceholderText(/Enter your name/i);
    const startButton = screen.getByText(/Start Your AI Journey/i);
    
    await user.type(nameInput, 'Test User');
    await user.click(startButton);
    
    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });

  it('loads saved progress from localStorage', () => {
    // Mock saved progress
    const savedProgress = {
      completedLessons: ['1-1'],
      userName: 'Saved User',
      tutorialCompleted: true,
      currentLessonId: '1-2'
    };
    
    localStorage.getItem.mockReturnValue(JSON.stringify(savedProgress));
    
    render(<App />);
    
    // Should load directly to journey view
    expect(screen.getByText(/Your Journey/i)).toBeInTheDocument();
  });

  it('handles localStorage parsing errors gracefully', () => {
    localStorage.getItem.mockReturnValue('invalid json');
    
    // Should not crash and show onboarding
    render(<App />);
    expect(screen.getByText(/Tickle Your Grey Matter/i)).toBeInTheDocument();
  });

  it('calculates progress percentage correctly', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const nameInput = screen.getByPlaceholderText(/Enter your name/i);
    const startButton = screen.getByText(/Start Your AI Journey/i);
    
    await user.type(nameInput, 'Test User');
    await user.click(startButton);
    
    await waitFor(() => {
      // Should show 0% initially
      expect(screen.getByText(/0% Complete/i)).toBeInTheDocument();
    });
  });

  it('shows time estimates correctly', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const nameInput = screen.getByPlaceholderText(/Enter your name/i);
    const startButton = screen.getByText(/Start Your AI Journey/i);
    
    await user.type(nameInput, 'Test User');
    await user.click(startButton);
    
    await waitFor(() => {
      // Should show time estimates
      expect(screen.getByText(/in module/i)).toBeInTheDocument();
      expect(screen.getByText(/total/i)).toBeInTheDocument();
    });
  });
});

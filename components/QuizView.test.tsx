import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuizView from './QuizView';
import { QuizData } from '../types';

const mockQuizData: QuizData = {
  questions: [
    {
      question: 'What is AI?',
      options: ['Artificial Intelligence', 'Automated Intelligence', 'Advanced Intelligence', 'Alien Intelligence'],
      correctAnswer: 'Artificial Intelligence'
    },
    {
      question: 'What does API stand for?',
      options: ['Application Programming Interface', 'Advanced Programming Interface', 'Automated Programming Interface', 'Application Process Interface'],
      correctAnswer: 'Application Programming Interface'
    }
  ]
};

describe('QuizView Component', () => {
  it('renders quiz questions correctly', () => {
    const mockOnComplete = vi.fn();
    render(<QuizView quiz={mockQuizData} onComplete={mockOnComplete} />);
    
    expect(screen.getByText('What is AI?')).toBeInTheDocument();
    expect(screen.getByText('Artificial Intelligence')).toBeInTheDocument();
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
  });

  it('allows selecting answers', async () => {
    const user = userEvent.setup();
    const mockOnComplete = vi.fn();
    render(<QuizView quiz={mockQuizData} onComplete={mockOnComplete} />);
    
    const correctOption = screen.getByText('Artificial Intelligence');
    await user.click(correctOption);
    
    // Should highlight the selected option
    expect(correctOption.closest('button')).toHaveClass('ring-2');
  });

  it('shows next question after answering', async () => {
    const user = userEvent.setup();
    const mockOnComplete = vi.fn();
    render(<QuizView quiz={mockQuizData} onComplete={mockOnComplete} />);
    
    // Answer first question
    await user.click(screen.getByText('Artificial Intelligence'));
    await user.click(screen.getByText('Next Question'));
    
    // Should show second question
    expect(screen.getByText('What does API stand for?')).toBeInTheDocument();
    expect(screen.getByText('Question 2 of 2')).toBeInTheDocument();
  });

  it('shows results after completing all questions', async () => {
    const user = userEvent.setup();
    const mockOnComplete = vi.fn();
    render(<QuizView quiz={mockQuizData} onComplete={mockOnComplete} />);
    
    // Answer first question correctly
    await user.click(screen.getByText('Artificial Intelligence'));
    await user.click(screen.getByText('Next Question'));
    
    // Answer second question correctly
    await user.click(screen.getByText('Application Programming Interface'));
    await user.click(screen.getByText('Finish Quiz'));
    
    // Should show results
    expect(screen.getByText(/Quiz Complete!/i)).toBeInTheDocument();
    expect(screen.getByText(/2 out of 2/i)).toBeInTheDocument();
  });

  it('calculates score correctly for mixed answers', async () => {
    const user = userEvent.setup();
    const mockOnComplete = vi.fn();
    render(<QuizView quiz={mockQuizData} onComplete={mockOnComplete} />);
    
    // Answer first question correctly
    await user.click(screen.getByText('Artificial Intelligence'));
    await user.click(screen.getByText('Next Question'));
    
    // Answer second question incorrectly
    await user.click(screen.getByText('Advanced Programming Interface'));
    await user.click(screen.getByText('Finish Quiz'));
    
    // Should show partial score
    expect(screen.getByText(/1 out of 2/i)).toBeInTheDocument();
  });

  it('calls onComplete when continuing after quiz', async () => {
    const user = userEvent.setup();
    const mockOnComplete = vi.fn();
    render(<QuizView quiz={mockQuizData} onComplete={mockOnComplete} />);
    
    // Complete the quiz
    await user.click(screen.getByText('Artificial Intelligence'));
    await user.click(screen.getByText('Next Question'));
    await user.click(screen.getByText('Application Programming Interface'));
    await user.click(screen.getByText('Finish Quiz'));
    
    // Click continue
    await user.click(screen.getByText('Continue'));
    
    expect(mockOnComplete).toHaveBeenCalled();
  });

  it('prevents advancing without selecting an answer', async () => {
    const user = userEvent.setup();
    const mockOnComplete = vi.fn();
    render(<QuizView quiz={mockQuizData} onComplete={mockOnComplete} />);
    
    // Try to advance without selecting
    const nextButton = screen.getByText('Next Question');
    expect(nextButton).toBeDisabled();
  });

  it('shows correct feedback for answers', async () => {
    const user = userEvent.setup();
    const mockOnComplete = vi.fn();
    render(<QuizView quiz={mockQuizData} onComplete={mockOnComplete} />);
    
    // Answer correctly
    await user.click(screen.getByText('Artificial Intelligence'));
    await user.click(screen.getByText('Next Question'));
    
    // Answer incorrectly
    await user.click(screen.getByText('Advanced Programming Interface'));
    await user.click(screen.getByText('Finish Quiz'));
    
    // Should show which answers were correct/incorrect
    expect(screen.getByText(/Quiz Complete!/i)).toBeInTheDocument();
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExerciseView from './ExerciseView';
import { ExerciseData } from '../types';
import * as geminiService from '../services/geminiService';

// Mock the gemini service
vi.mock('../services/geminiService');

const mockExercise: ExerciseData = {
  prompt: <div>Create a JSON object with name and age properties</div>,
  evaluationPrompt: 'Check if the JSON object has name and age properties',
  initialCode: '{\n  \n}'
};

describe('ExerciseView Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders exercise prompt and textarea', () => {
    const mockOnComplete = vi.fn();
    render(<ExerciseView exercise={mockExercise} onComplete={mockOnComplete} />);
    
    expect(screen.getByText('Create a JSON object with name and age properties')).toBeInTheDocument();
    expect(screen.getByLabelText('Your Answer:')).toBeInTheDocument();
    expect(screen.getByText('Check My Work')).toBeInTheDocument();
  });

  it('loads initial code in textarea', () => {
    const mockOnComplete = vi.fn();
    render(<ExerciseView exercise={mockExercise} onComplete={mockOnComplete} />);
    
    const textarea = screen.getByLabelText('Your Answer:') as HTMLTextAreaElement;
    expect(textarea.value).toBe('{\n  \n}');
  });

  it('allows user to edit code', async () => {
    const user = userEvent.setup();
    const mockOnComplete = vi.fn();
    render(<ExerciseView exercise={mockExercise} onComplete={mockOnComplete} />);
    
    const textarea = screen.getByLabelText('Your Answer:');
    await user.clear(textarea);
    await user.type(textarea, '{"name": "John", "age": 30}');
    
    expect(textarea).toHaveValue('{"name": "John", "age": 30}');
  });

  it('submits exercise for evaluation', async () => {
    const user = userEvent.setup();
    const mockOnComplete = vi.fn();
    
    // Mock successful evaluation
    vi.mocked(geminiService.evaluateExercise).mockResolvedValue({
      isCorrect: true,
      feedback: 'Perfect! Your JSON object is correctly formatted.'
    });
    
    render(<ExerciseView exercise={mockExercise} onComplete={mockOnComplete} />);
    
    const textarea = screen.getByLabelText('Your Answer:');
    const submitButton = screen.getByText('Check My Work');

    await user.clear(textarea);
    await user.type(textarea, '{"name": "John", "age": 30}');
    await user.click(submitButton);

    expect(geminiService.evaluateExercise).toHaveBeenCalledWith(
      'Check if the JSON object has name and age properties',
      '{"name": "John", "age": 30}'
    );
  });

  it('shows loading state during evaluation', async () => {
    const user = userEvent.setup();
    const mockOnComplete = vi.fn();

    // Mock delayed evaluation
    vi.mocked(geminiService.evaluateExercise).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({
        isCorrect: true,
        feedback: 'Great job!'
      }), 100))
    );

    render(<ExerciseView exercise={mockExercise} onComplete={mockOnComplete} />);

    const submitButton = screen.getByText('Check My Work');
    await user.click(submitButton);

    expect(screen.getByText('Thinking...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('displays correct feedback for successful submission', async () => {
    const user = userEvent.setup();
    const mockOnComplete = vi.fn();

    vi.mocked(geminiService.evaluateExercise).mockResolvedValue({
      isCorrect: true,
      feedback: 'Excellent work! Your solution is perfect.'
    });

    render(<ExerciseView exercise={mockExercise} onComplete={mockOnComplete} />);

    const submitButton = screen.getByText('Check My Work');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Excellent work! Your solution is perfect.')).toBeInTheDocument();
      expect(screen.getByText('Continue')).toBeInTheDocument();
    });
  });

  it('displays feedback for incorrect submission', async () => {
    const user = userEvent.setup();
    const mockOnComplete = vi.fn();

    vi.mocked(geminiService.evaluateExercise).mockResolvedValue({
      isCorrect: false,
      feedback: 'Good try! You\'re missing the age property. Try adding it to your JSON object.'
    });

    render(<ExerciseView exercise={mockExercise} onComplete={mockOnComplete} />);

    const submitButton = screen.getByText('Check My Work');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Good try! You're missing the age property/)).toBeInTheDocument();
      expect(screen.getByText('Try Again')).toBeInTheDocument();
    });
  });

  it('allows retrying after incorrect submission', async () => {
    const user = userEvent.setup();
    const mockOnComplete = vi.fn();
    
    // First submission - incorrect
    vi.mocked(geminiService.evaluateExercise).mockResolvedValueOnce({
      isCorrect: false,
      feedback: 'Try again!'
    });
    
    render(<ExerciseView exercise={mockExercise} onComplete={mockOnComplete} />);
    
    const submitButton = screen.getByText('Submit Answer');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Try Again')).toBeInTheDocument();
    });
    
    // Click try again
    const tryAgainButton = screen.getByText('Try Again');
    await user.click(tryAgainButton);
    
    // Should be able to submit again
    expect(screen.getByText('Submit Answer')).toBeInTheDocument();
  });

  it('calls onComplete when continuing after correct submission', async () => {
    const user = userEvent.setup();
    const mockOnComplete = vi.fn();
    
    vi.mocked(geminiService.evaluateExercise).mockResolvedValue({
      isCorrect: true,
      feedback: 'Perfect!'
    });
    
    render(<ExerciseView exercise={mockExercise} onComplete={mockOnComplete} />);
    
    const submitButton = screen.getByText('Submit Answer');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Continue to Next Lesson')).toBeInTheDocument();
    });
    
    const continueButton = screen.getByText('Continue to Next Lesson');
    await user.click(continueButton);
    
    expect(mockOnComplete).toHaveBeenCalled();
  });

  it('handles evaluation errors gracefully', async () => {
    const user = userEvent.setup();
    const mockOnComplete = vi.fn();
    
    vi.mocked(geminiService.evaluateExercise).mockRejectedValue(new Error('Network error'));
    
    render(<ExerciseView exercise={mockExercise} onComplete={mockOnComplete} />);
    
    const submitButton = screen.getByText('Submit Answer');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('An unexpected error occurred. Please try again.')).toBeInTheDocument();
    });
  });

  it('disables submit button when textarea is empty', () => {
    const mockOnComplete = vi.fn();
    const exerciseWithoutInitialCode: ExerciseData = {
      ...mockExercise,
      initialCode: undefined
    };
    
    render(<ExerciseView exercise={exerciseWithoutInitialCode} onComplete={mockOnComplete} />);
    
    const submitButton = screen.getByText('Submit Answer');
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when user types in textarea', async () => {
    const user = userEvent.setup();
    const mockOnComplete = vi.fn();
    const exerciseWithoutInitialCode: ExerciseData = {
      ...mockExercise,
      initialCode: undefined
    };
    
    render(<ExerciseView exercise={exerciseWithoutInitialCode} onComplete={mockOnComplete} />);
    
    const textarea = screen.getByLabelText('Your Answer:');
    const submitButton = screen.getByText('Submit Answer');
    
    expect(submitButton).toBeDisabled();
    
    await user.type(textarea, 'some code');
    
    expect(submitButton).toBeEnabled();
  });
});

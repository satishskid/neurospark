import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurriculumView from './CurriculumView';
import { Module, UserProgress } from '../types';

const mockCurriculum: Module[] = [
  {
    id: 'module-1',
    title: 'Module 1: Introduction',
    description: 'Learn the basics',
    lessons: [
      {
        id: '1-1',
        title: 'What is AI?',
        type: 'content',
        estimatedTimeMinutes: 5
      },
      {
        id: '1-2',
        title: 'AI Quiz',
        type: 'quiz',
        estimatedTimeMinutes: 3,
        quiz: {
          questions: [
            {
              question: 'What is AI?',
              options: ['Option 1', 'Option 2'],
              correctAnswer: 'Option 1'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'module-2',
    title: 'Module 2: Advanced Topics',
    description: 'Deep dive into AI',
    lessons: [
      {
        id: '2-1',
        title: 'Machine Learning',
        type: 'content',
        estimatedTimeMinutes: 10
      }
    ]
  }
];

const mockProgress: UserProgress = {
  completedLessons: new Set(['1-1']),
  userName: 'Test User',
  tutorialCompleted: true
};

describe('CurriculumView Component', () => {
  it('renders all modules and lessons', () => {
    const mockOnSelectLesson = vi.fn();
    const mockIsLessonUnlocked = vi.fn().mockReturnValue(true);
    
    render(
      <CurriculumView
        curriculum={mockCurriculum}
        progress={mockProgress}
        currentLessonId="1-1"
        onSelectLesson={mockOnSelectLesson}
        isLessonUnlocked={mockIsLessonUnlocked}
      />
    );
    
    expect(screen.getByText('Module 1: Introduction')).toBeInTheDocument();
    expect(screen.getByText('Module 2: Advanced Topics')).toBeInTheDocument();
    expect(screen.getByText('What is AI?')).toBeInTheDocument();
    expect(screen.getByText('AI Quiz')).toBeInTheDocument();
    expect(screen.getByText('Machine Learning')).toBeInTheDocument();
  });

  it('shows completed lessons with checkmarks', () => {
    const mockOnSelectLesson = vi.fn();
    const mockIsLessonUnlocked = vi.fn().mockReturnValue(true);
    
    render(
      <CurriculumView
        curriculum={mockCurriculum}
        progress={mockProgress}
        currentLessonId="1-2"
        onSelectLesson={mockOnSelectLesson}
        isLessonUnlocked={mockIsLessonUnlocked}
      />
    );
    
    // First lesson should show as completed
    const completedLesson = screen.getByText('What is AI?').closest('button');
    expect(completedLesson).toHaveClass('bg-green-900');
  });

  it('highlights current lesson', () => {
    const mockOnSelectLesson = vi.fn();
    const mockIsLessonUnlocked = vi.fn().mockReturnValue(true);
    
    render(
      <CurriculumView
        curriculum={mockCurriculum}
        progress={mockProgress}
        currentLessonId="1-2"
        onSelectLesson={mockOnSelectLesson}
        isLessonUnlocked={mockIsLessonUnlocked}
      />
    );
    
    // Current lesson should be highlighted
    const currentLesson = screen.getByText('AI Quiz').closest('button');
    expect(currentLesson).toHaveClass('ring-2', 'ring-cyan-400');
  });

  it('shows locked lessons as disabled', () => {
    const mockOnSelectLesson = vi.fn();
    const mockIsLessonUnlocked = vi.fn((lessonId) => lessonId === '1-1');
    
    render(
      <CurriculumView
        curriculum={mockCurriculum}
        progress={mockProgress}
        currentLessonId="1-1"
        onSelectLesson={mockOnSelectLesson}
        isLessonUnlocked={mockIsLessonUnlocked}
      />
    );
    
    // Second lesson should be locked
    const lockedLesson = screen.getByText('AI Quiz').closest('button');
    expect(lockedLesson).toHaveClass('opacity-50');
  });

  it('calls onSelectLesson when unlocked lesson is clicked', async () => {
    const user = userEvent.setup();
    const mockOnSelectLesson = vi.fn();
    const mockIsLessonUnlocked = vi.fn().mockReturnValue(true);
    
    render(
      <CurriculumView
        curriculum={mockCurriculum}
        progress={mockProgress}
        currentLessonId="1-1"
        onSelectLesson={mockOnSelectLesson}
        isLessonUnlocked={mockIsLessonUnlocked}
      />
    );
    
    const lesson = screen.getByText('AI Quiz');
    await user.click(lesson);
    
    expect(mockOnSelectLesson).toHaveBeenCalledWith('1-2');
  });

  it('does not call onSelectLesson when locked lesson is clicked', async () => {
    const user = userEvent.setup();
    const mockOnSelectLesson = vi.fn();
    const mockIsLessonUnlocked = vi.fn((lessonId) => lessonId === '1-1');
    
    render(
      <CurriculumView
        curriculum={mockCurriculum}
        progress={mockProgress}
        currentLessonId="1-1"
        onSelectLesson={mockOnSelectLesson}
        isLessonUnlocked={mockIsLessonUnlocked}
      />
    );
    
    const lockedLesson = screen.getByText('AI Quiz');
    await user.click(lockedLesson);
    
    expect(mockOnSelectLesson).not.toHaveBeenCalled();
  });

  it('displays lesson types with appropriate icons', () => {
    const mockOnSelectLesson = vi.fn();
    const mockIsLessonUnlocked = vi.fn().mockReturnValue(true);
    
    render(
      <CurriculumView
        curriculum={mockCurriculum}
        progress={mockProgress}
        currentLessonId="1-1"
        onSelectLesson={mockOnSelectLesson}
        isLessonUnlocked={mockIsLessonUnlocked}
      />
    );
    
    // Should show different icons for different lesson types
    expect(screen.getByText('What is AI?')).toBeInTheDocument();
    expect(screen.getByText('AI Quiz')).toBeInTheDocument();
  });

  it('shows estimated time for lessons', () => {
    const mockOnSelectLesson = vi.fn();
    const mockIsLessonUnlocked = vi.fn().mockReturnValue(true);
    
    render(
      <CurriculumView
        curriculum={mockCurriculum}
        progress={mockProgress}
        currentLessonId="1-1"
        onSelectLesson={mockOnSelectLesson}
        isLessonUnlocked={mockIsLessonUnlocked}
      />
    );
    
    expect(screen.getByText('5m')).toBeInTheDocument();
    expect(screen.getByText('3m')).toBeInTheDocument();
    expect(screen.getByText('10m')).toBeInTheDocument();
  });

  it('calculates module progress correctly', () => {
    const mockOnSelectLesson = vi.fn();
    const mockIsLessonUnlocked = vi.fn().mockReturnValue(true);
    
    render(
      <CurriculumView
        curriculum={mockCurriculum}
        progress={mockProgress}
        currentLessonId="1-1"
        onSelectLesson={mockOnSelectLesson}
        isLessonUnlocked={mockIsLessonUnlocked}
      />
    );
    
    // Module 1 should show 1/2 lessons completed (50%)
    // Module 2 should show 0/1 lessons completed (0%)
    expect(screen.getByText('1 / 2')).toBeInTheDocument();
    expect(screen.getByText('0 / 1')).toBeInTheDocument();
  });

  it('handles empty curriculum gracefully', () => {
    const mockOnSelectLesson = vi.fn();
    const mockIsLessonUnlocked = vi.fn();
    
    render(
      <CurriculumView
        curriculum={[]}
        progress={mockProgress}
        currentLessonId={null}
        onSelectLesson={mockOnSelectLesson}
        isLessonUnlocked={mockIsLessonUnlocked}
      />
    );
    
    // Should not crash and render empty state
    expect(screen.queryByText('Module')).not.toBeInTheDocument();
  });

  it('handles null currentLessonId gracefully', () => {
    const mockOnSelectLesson = vi.fn();
    const mockIsLessonUnlocked = vi.fn().mockReturnValue(true);
    
    render(
      <CurriculumView
        curriculum={mockCurriculum}
        progress={mockProgress}
        currentLessonId={null}
        onSelectLesson={mockOnSelectLesson}
        isLessonUnlocked={mockIsLessonUnlocked}
      />
    );
    
    // Should render without highlighting any lesson
    expect(screen.getByText('What is AI?')).toBeInTheDocument();
    expect(screen.getByText('AI Quiz')).toBeInTheDocument();
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';

// Unmock aiService to test the actual implementation
vi.unmock('./aiService');

import { evaluateExercise, getChatbotResponse } from './aiService';
import { Module } from '../types';

// Mock the Google GenAI module
vi.mock('@google/genai', () => {
  const generateContent = vi.fn();
  const createChat = vi.fn();
  return {
    GoogleGenAI: vi.fn().mockImplementation(() => ({
      models: {
        generateContent
      },
      chats: {
        create: createChat
      }
    }))
  };
});

// Mock the Groq module
vi.mock('groq-sdk', () => {
  const createCompletion = vi.fn();
  return {
    Groq: vi.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: createCompletion
        }
      }
    }))
  };
});

const mockModule: Module = {
  id: 'test-module',
  title: 'Test Module',
  description: 'A test module for testing',
  lessons: [
    {
      id: 'test-lesson',
      title: 'Test Lesson',
      type: 'content',
      estimatedTimeMinutes: 5
    }
  ]
};

describe('AI Service', () => {
  let localStorageMock: { getItem: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup localStorage mock
    localStorageMock = {
      getItem: vi.fn(),
    };
    Object.defineProperty(global, 'localStorage', {
      value: localStorageMock,
      writable: true
    });
    
    // Clear meta env
    (import.meta as any).env = {};
  });

  describe('evaluateExercise', () => {
    it('returns fallback response when API key is not set', async () => {
      localStorageMock.getItem.mockReturnValue(null);
      
      const result = await evaluateExercise('Test prompt', 'Test input');
      
      expect(result.isCorrect).toBe(false);
      expect(result.feedback).toContain('API Key in the settings');
    });

    it('handles API errors gracefully', async () => {
      localStorageMock.getItem.mockReturnValue('test-gemini-key');
      
      const { GoogleGenAI } = await import('@google/genai');
      const mockAI = new GoogleGenAI({ apiKey: 'test' });
      mockAI.models.generateContent.mockRejectedValue(new Error('API Error'));
      
      const result = await evaluateExercise('Test prompt', 'Test input');
      
      expect(result.isCorrect).toBe(false);
      expect(result.feedback).toContain('trouble processing');
    });

    it('parses successful API response correctly', async () => {
      localStorageMock.getItem.mockReturnValue('test-gemini-key');
      
      const mockResponse = {
        text: JSON.stringify({
          isCorrect: true,
          feedback: 'Great job!'
        })
      };
      
      const { GoogleGenAI } = await import('@google/genai');
      const mockAI = new GoogleGenAI({ apiKey: 'test' });
      mockAI.models.generateContent.mockResolvedValue(mockResponse);
      
      const result = await evaluateExercise('Test prompt', 'Test input');
      
      expect(result.isCorrect).toBe(true);
      expect(result.feedback).toBe('Great job!');
    });

    it('handles malformed JSON responses', async () => {
      localStorageMock.getItem.mockReturnValue('test-gemini-key');
      
      const mockResponse = {
        text: 'Invalid JSON response'
      };
      
      const { GoogleGenAI } = await import('@google/genai');
      const mockAI = new GoogleGenAI({ apiKey: 'test' });
      mockAI.models.generateContent.mockResolvedValue(mockResponse);
      
      const result = await evaluateExercise('Test prompt', 'Test input');
      
      expect(result.isCorrect).toBe(false);
      expect(result.feedback).toContain('trouble processing');
    });
  });

  describe('getChatbotResponse', () => {
    it('returns fallback response when API key is not set', async () => {
      localStorageMock.getItem.mockReturnValue(null);
      
      const result = await getChatbotResponse(mockModule, 'Test curriculum', [], 'Test query');
      
      expect(result).toContain('currently unavailable');
    });

    it('handles API errors gracefully', async () => {
      localStorageMock.getItem.mockReturnValue('test-gemini-key');
      
      const { GoogleGenAI } = await import('@google/genai');
      const mockAI = new GoogleGenAI({ apiKey: 'test' });
      const mockChat = {
        sendMessage: vi.fn().mockRejectedValue(new Error('Chat API Error'))
      };
      mockAI.chats.create.mockReturnValue(mockChat);
      
      const result = await getChatbotResponse(mockModule, 'Test curriculum', [], 'Test query');
      
      expect(result).toContain('unavailable or you might be out of quota');
    });

    it('processes successful chat response', async () => {
      localStorageMock.getItem.mockReturnValue('test-gemini-key');
      
      const { GoogleGenAI } = await import('@google/genai');
      const mockAI = new GoogleGenAI({ apiKey: 'test' });
      const mockChat = {
        sendMessage: vi.fn().mockResolvedValue({
          text: 'This is a helpful response about AI!'
        })
      };
      mockAI.chats.create.mockReturnValue(mockChat);
      
      const result = await getChatbotResponse(mockModule, 'Test curriculum', [], 'What is AI?');
      
      expect(result).toBe('This is a helpful response about AI!');
      expect(mockChat.sendMessage).toHaveBeenCalledWith({ message: 'What is AI?' });
    });

    it('includes proper system instructions', async () => {
      localStorageMock.getItem.mockReturnValue('test-gemini-key');
      
      const { GoogleGenAI } = await import('@google/genai');
      const mockAI = new GoogleGenAI({ apiKey: 'test' });
      const mockChat = {
        sendMessage: vi.fn().mockResolvedValue({ text: 'Response' })
      };
      mockAI.chats.create.mockReturnValue(mockChat);
      
      await getChatbotResponse(mockModule, 'Test curriculum', [], 'Test query');
      
      expect(mockAI.chats.create).toHaveBeenCalledWith({
        model: 'gemini-2.5-flash',
        history: [],
        config: {
          systemInstruction: expect.stringContaining('greybrain.ai')
        }
      });
    });

    it('formats chat history correctly', async () => {
      localStorageMock.getItem.mockReturnValue('test-gemini-key');
      
      const { GoogleGenAI } = await import('@google/genai');
      const mockAI = new GoogleGenAI({ apiKey: 'test' });
      const mockChat = {
        sendMessage: vi.fn().mockResolvedValue({ text: 'Response' })
      };
      mockAI.chats.create.mockReturnValue(mockChat);
      
      const chatHistory = [
        { role: 'user' as const, content: 'Hello' },
        { role: 'model' as const, content: 'Hi there!' }
      ];
      
      await getChatbotResponse(mockModule, 'Test curriculum', chatHistory, 'Test query');
      
      expect(mockAI.chats.create).toHaveBeenCalledWith({
        model: 'gemini-2.5-flash',
        history: [
          { role: 'user', parts: [{ text: 'Hello' }] },
          { role: 'model', parts: [{ text: 'Hi there!' }] }
        ],
        config: {
          systemInstruction: expect.any(String)
        }
      });
    });
  });
});

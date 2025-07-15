import { describe, it, expect, vi, beforeEach } from 'vitest';
import { evaluateExercise, getChatbotResponse } from './geminiService';
import { Module } from '../types';

// Mock the Google GenAI module
vi.mock('@google/genai', () => ({
  GoogleGenAI: vi.fn().mockImplementation(() => ({
    models: {
      generateContent: vi.fn()
    },
    chats: {
      create: vi.fn()
    }
  }))
}));

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

describe('Gemini Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('evaluateExercise', () => {
    it('returns fallback response when API key is not set', async () => {
      // Mock missing API key
      const originalEnv = process.env.API_KEY;
      delete process.env.API_KEY;
      
      const result = await evaluateExercise('Test prompt', 'Test input');
      
      expect(result.isCorrect).toBe(false);
      expect(result.feedback).toContain('API Key is not configured');
      
      // Restore original env
      process.env.API_KEY = originalEnv;
    });

    it('handles API errors gracefully', async () => {
      // Mock API error
      const { GoogleGenAI } = await import('@google/genai');
      const mockAI = new GoogleGenAI({ apiKey: 'test' });
      mockAI.models.generateContent.mockRejectedValue(new Error('API Error'));
      
      const result = await evaluateExercise('Test prompt', 'Test input');
      
      expect(result.isCorrect).toBe(false);
      expect(result.feedback).toContain('trouble processing');
    });

    it('parses successful API response correctly', async () => {
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
      // Mock missing API key
      const originalEnv = process.env.API_KEY;
      delete process.env.API_KEY;
      
      const result = await getChatbotResponse(mockModule, 'Test curriculum', [], 'Test query');
      
      expect(result).toContain('AI Tutor is currently unavailable');
      
      // Restore original env
      process.env.API_KEY = originalEnv;
    });

    it('handles API errors gracefully', async () => {
      const { GoogleGenAI } = await import('@google/genai');
      const mockAI = new GoogleGenAI({ apiKey: 'test' });
      const mockChat = {
        sendMessage: vi.fn().mockRejectedValue(new Error('Chat API Error'))
      };
      mockAI.chats.create.mockReturnValue(mockChat);
      
      const result = await getChatbotResponse(mockModule, 'Test curriculum', [], 'Test query');
      
      expect(result).toContain('trouble connecting');
    });

    it('processes successful chat response', async () => {
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

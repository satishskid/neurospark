import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./test-setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  define: {
    'process.env.API_KEY': JSON.stringify('test-api-key'),
    'process.env.GEMINI_API_KEY': JSON.stringify('test-api-key')
  }
});

import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
    return {
      server: {
        port: 7773
      },
      build: {
        outDir: 'dist',
        sourcemap: mode === 'development',
        rollupOptions: {
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom'],
              admin: ['./AdminApp.tsx', './services/adminService.ts'],
            }
          }
        }
      },
      define: {
        'process.env.NODE_ENV': JSON.stringify(mode),
        'process.env.VITE_APP_NAME': JSON.stringify('GreyWaken'),
        'process.env.VITE_COMPANY_NAME': JSON.stringify('greybrain.ai')
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});

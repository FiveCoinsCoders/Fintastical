/* eslint-disable no-undef */
import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'gi6sbw',
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
  e2e: {
    baseUrl: 'http://localhost:5173',
    supportFile: false,
    video: false,
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
    
      return config;
    },
  },
});
// vite.config.mjs
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';

export default defineConfig({
  plugins: [
    react(), // React plugin for Vite
    jsconfigPaths(), // Support for jsconfig paths
  ],
  base: process.env.VITE_APP_BASE_NAME || '/', // Base URL, defaults to '/'
  define: {
    global: 'window', // Define global variable for compatibility
  },
  build: {
    outDir: 'dist', // Output directory
    rollupOptions: {
      external: ['react-quill', 'quill/dist/quill.snow.css'], // External dependencies
    },
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'), // Alias for src directory
    },
  },
  server: {
    open: true, // Automatically open the browser
    host: true, // Enable external access to dev server
    port: 3000, // Dev server port
  },
  preview: {
    open: true, // Automatically open the browser
    port: 3000, // Preview server port
  },
});

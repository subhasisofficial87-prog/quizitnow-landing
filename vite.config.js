import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'
import { join } from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    // Development server configuration
    middlewareMode: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Ensure all assets are properly bundled
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  // Configuration for serving on GitHub Pages with subpaths
  preview: {
    port: 5173,
  }
})

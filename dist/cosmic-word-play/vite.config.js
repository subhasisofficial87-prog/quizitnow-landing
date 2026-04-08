import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/cosmic-word-play/',
  plugins: [react()],
})

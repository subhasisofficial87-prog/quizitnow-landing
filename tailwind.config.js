/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00ffff',
        'neon-pink': '#ff0080',
        'neon-magenta': '#ff00ff',
        'neon-green': '#00ff00',
        'neon-purple': '#b026ff',
        'neon-blue': '#0080ff',
        'dark-bg': '#0a0e27',
        'dark-secondary': '#1a1f3a',
      },
      animation: {
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'breathe': 'breathe 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

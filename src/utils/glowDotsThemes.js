// Beautiful themes for Glow Dots

export const THEMES = {
  'neon-dream': {
    name: 'Neon Dream',
    bg: 'from-purple-950 via-blue-950 to-purple-950',
    dotColor: '#00ffff',
    dotGlow: 'rgba(0, 255, 255, 0.5)',
    lineColor: '#00ffff',
    lineGlow: 'rgba(0, 255, 255, 0.4)',
    player1: {
      color: '#00ffff',
      fill: '#00ffff',
      glow: 'rgba(0, 255, 255, 0.6)'
    },
    player2: {
      color: '#ff0080',
      fill: '#ff0080',
      glow: 'rgba(255, 0, 128, 0.6)'
    },
    confetti1: '#00ffff',
    confetti2: '#ff0080',
    confetti3: '#b026ff',
    accent: '#00ff88'
  },
  'pastel-paradise': {
    name: 'Pastel Paradise',
    bg: 'from-pink-50 via-purple-50 to-blue-50',
    dotColor: '#9333ea',
    dotGlow: 'rgba(147, 51, 234, 0.3)',
    lineColor: '#9333ea',
    lineGlow: 'rgba(147, 51, 234, 0.2)',
    player1: {
      color: '#ec4899',
      fill: '#ec4899',
      glow: 'rgba(236, 72, 153, 0.4)'
    },
    player2: {
      color: '#06b6d4',
      fill: '#06b6d4',
      glow: 'rgba(6, 182, 212, 0.4)'
    },
    confetti1: '#ec4899',
    confetti2: '#06b6d4',
    confetti3: '#8b5cf6',
    accent: '#f43f5e'
  },
  'midnight-glow': {
    name: 'Midnight Glow',
    bg: 'from-slate-950 via-slate-900 to-slate-950',
    dotColor: '#10b981',
    dotGlow: 'rgba(16, 185, 129, 0.4)',
    lineColor: '#10b981',
    lineGlow: 'rgba(16, 185, 129, 0.3)',
    player1: {
      color: '#10b981',
      fill: '#10b981',
      glow: 'rgba(16, 185, 129, 0.5)'
    },
    player2: {
      color: '#f59e0b',
      fill: '#f59e0b',
      glow: 'rgba(245, 158, 11, 0.5)'
    },
    confetti1: '#10b981',
    confetti2: '#f59e0b',
    confetti3: '#3b82f6',
    accent: '#06b6d4'
  },
  'candy-pop': {
    name: 'Candy Pop',
    bg: 'from-yellow-100 via-pink-100 to-purple-100',
    dotColor: '#f43f5e',
    dotGlow: 'rgba(244, 63, 94, 0.35)',
    lineColor: '#f43f5e',
    lineGlow: 'rgba(244, 63, 94, 0.25)',
    player1: {
      color: '#ff6b9d',
      fill: '#ff6b9d',
      glow: 'rgba(255, 107, 157, 0.45)'
    },
    player2: {
      color: '#ffd93d',
      fill: '#ffd93d',
      glow: 'rgba(255, 217, 61, 0.45)'
    },
    confetti1: '#ff6b9d',
    confetti2: '#ffd93d',
    confetti3: '#6bcf7f',
    accent: '#f15bb5'
  }
}

export const THEME_NAMES = Object.keys(THEMES)

export const getTheme = (themeName) => {
  return THEMES[themeName] || THEMES['neon-dream']
}

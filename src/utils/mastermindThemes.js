// Beautiful themes for GlowCrack

export const THEMES = {
  'neon-glow': {
    name: 'Neon Glow',
    bg: 'from-purple-950 via-blue-950 to-purple-950',
    boardBg: 'rgba(20, 10, 40, 0.8)',
    textColor: '#00ffff',
    accentColor: '#00ff88',
    pegs: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'],
    pegGlow: ['rgba(255, 107, 107, 0.6)', 'rgba(78, 205, 196, 0.6)', 'rgba(69, 183, 209, 0.6)', 'rgba(255, 160, 122, 0.6)', 'rgba(152, 216, 200, 0.6)', 'rgba(247, 220, 111, 0.6)'],
    feedbackBlack: '#000000',
    feedbackWhite: '#FFFFFF',
    buttonBg: 'linear-gradient(135deg, #00ffff, #00ff88)',
    buttonHover: 'linear-gradient(135deg, #00ff88, #ff0080)'
  },
  'pastel-dream': {
    name: 'Pastel Dream',
    bg: 'from-pink-50 via-purple-50 to-blue-50',
    boardBg: 'rgba(240, 230, 250, 0.9)',
    textColor: '#6B4C8A',
    accentColor: '#FF66CC',
    pegs: ['#FF69B4', '#87CEEB', '#98FB98', '#FFD700', '#FFA500', '#DDA0DD'],
    pegGlow: ['rgba(255, 105, 180, 0.4)', 'rgba(135, 206, 235, 0.4)', 'rgba(152, 251, 152, 0.4)', 'rgba(255, 215, 0, 0.4)', 'rgba(255, 165, 0, 0.4)', 'rgba(221, 160, 221, 0.4)'],
    feedbackBlack: '#333333',
    feedbackWhite: '#FFFFFF',
    buttonBg: 'linear-gradient(135deg, #FF66CC, #FF1493)',
    buttonHover: 'linear-gradient(135deg, #FF1493, #FF69B4)'
  },
  'midnight-code': {
    name: 'Midnight Code',
    bg: 'from-slate-950 via-slate-900 to-slate-950',
    boardBg: 'rgba(15, 23, 42, 0.95)',
    textColor: '#10B981',
    accentColor: '#06B6D4',
    pegs: ['#EF4444', '#F97316', '#EAB308', '#22C55E', '#3B82F6', '#A855F7'],
    pegGlow: ['rgba(239, 68, 68, 0.5)', 'rgba(249, 115, 22, 0.5)', 'rgba(234, 179, 8, 0.5)', 'rgba(34, 197, 94, 0.5)', 'rgba(59, 130, 246, 0.5)', 'rgba(168, 85, 247, 0.5)'],
    feedbackBlack: '#000000',
    feedbackWhite: '#FFFFFF',
    buttonBg: 'linear-gradient(135deg, #10B981, #06B6D4)',
    buttonHover: 'linear-gradient(135deg, #06B6D4, #10B981)'
  },
  'candy-lab': {
    name: 'Candy Lab',
    bg: 'from-yellow-100 via-pink-100 to-purple-100',
    boardBg: 'rgba(255, 250, 205, 0.95)',
    textColor: '#D946A6',
    accentColor: '#EC4899',
    pegs: ['#FF6B9D', '#FFA500', '#FFD93D', '#6BCF7F', '#A0D8F7', '#FF69B4'],
    pegGlow: ['rgba(255, 107, 157, 0.45)', 'rgba(255, 165, 0, 0.45)', 'rgba(255, 217, 61, 0.45)', 'rgba(107, 207, 127, 0.45)', 'rgba(160, 216, 247, 0.45)', 'rgba(255, 105, 180, 0.45)'],
    feedbackBlack: '#333333',
    feedbackWhite: '#FFFFFF',
    buttonBg: 'linear-gradient(135deg, #FF6B9D, #FFD93D)',
    buttonHover: 'linear-gradient(135deg, #FFD93D, #FF69B4)'
  },
  'retro-terminal': {
    name: 'Retro Terminal',
    bg: 'from-gray-900 via-green-900 to-gray-900',
    boardBg: 'rgba(10, 40, 20, 0.9)',
    textColor: '#00FF00',
    accentColor: '#00FF00',
    pegs: ['#FF3333', '#FFFF00', '#00FF00', '#00FFFF', '#FF00FF', '#FFFFFF'],
    pegGlow: ['rgba(255, 51, 51, 0.5)', 'rgba(255, 255, 0, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(0, 255, 255, 0.5)', 'rgba(255, 0, 255, 0.5)', 'rgba(255, 255, 255, 0.5)'],
    feedbackBlack: '#000000',
    feedbackWhite: '#00FF00',
    buttonBg: 'linear-gradient(135deg, #00FF00, #00FFFF)',
    buttonHover: 'linear-gradient(135deg, #00FFFF, #FF00FF)'
  }
}

export const THEME_NAMES = Object.keys(THEMES)

export const getTheme = (themeName) => {
  return THEMES[themeName] || THEMES['neon-glow']
}

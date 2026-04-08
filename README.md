# QuizItNow Landing Page

A modern, animated landing page for the QuizItNow.com platform. This serves as the main entry point for all QuizItNow applications.

## Features

- 🎨 Modern, animated UI with CSS animations
- ✨ Responsive design for mobile, tablet, and desktop
- 🌈 Beautiful neon color scheme
- ⚡ Built with React 18 and Vite
- 🎯 Easy app navigation with cards
- 📱 Mobile-friendly hamburger menu

## Project Structure

```
src/
├── components/
│   ├── Navigation.jsx          # Header with app menu
│   ├── Navigation.css
│   ├── LandingPage.jsx         # Hero and apps grid
│   ├── LandingPage.css
│   └── AppCard.jsx             # Individual app card component
├── App.jsx                     # Main app component
├── App.css
├── index.css                   # Global styles and animations
└── main.jsx                    # React entry point
```

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Apps Navigation

The landing page links to the following apps:

- `/cosmic-word-play/` - Cosmic Word Play
- `/zoomable-earth/` - Zoomable Earth
- `/guess-my-neon/` - Guess My Neon
- `/quizitnow/` - QuizItNow
- `/recipe-generator/` - Recipe Generator

## Customization

### Colors

Edit CSS variables in `src/index.css`:

```css
:root {
  --neon-cyan: #00ffff;
  --neon-pink: #ff0080;
  --neon-magenta: #ff00ff;
  --neon-green: #00ff00;
  --neon-purple: #b026ff;
  --neon-blue: #0080ff;
  --dark-bg: #0a0e27;
}
```

### Animations

All animations are defined in `src/index.css` with keyframes:
- `fadeIn` - Simple fade-in effect
- `slideUpFade` - Slide up with fade
- `slideDownFade` - Slide down with fade
- `scaleIn` - Scale-in effect
- `glowPulse` - Neon glow pulse
- `float` - Floating animation
- `shimmer` - Shimmer effect
- `rotateBorder` - Color rotation

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT

## Contributing

Feel free to customize and extend this landing page to fit your needs!

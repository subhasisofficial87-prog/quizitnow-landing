# QuizItNow - Quick Start Guide

## 🎮 Live Site
**👉 Visit:** https://quizitnow.com/

---

## 📱 Game URLs

Navigate directly to any game:

| Game | URL |
|------|-----|
| 🔮 Cosmic Word Play | https://quizitnow.com/cosmic-word-play |
| 🌍 Zoomable Earth | https://quizitnow.com/zoomable-earth |
| 🎯 Guess My Neon | https://quizitnow.com/guess-my-neon |
| 🧠 QuizItNow | https://quizitnow.com/quizitnow |
| 👨‍🍳 Recipe Generator | https://quizitnow.com/recipe-generator |
| 🎪 OX Bull Cow | https://quizitnow.com/ox-bull-cow |

---

## 🛠️ Local Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/subhasisofficial87-prog/quizitnow-landing.git
cd quizitnow-landing

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server
- **URL:** http://localhost:5173/
- **Auto-reload:** Yes (HMR enabled)
- **Browser:** Opens automatically

---

## 🚀 Deployment

### Automatic (GitHub Actions)
1. **Push to main branch** → GitHub Actions automatically builds and deploys
2. **Wait 2-5 minutes** → Site updates at quizitnow.com

### Manual Deployment
```bash
git push origin main
# Check GitHub Actions: https://github.com/subhasisofficial87-prog/quizitnow-landing/actions
```

---

## 📁 Project Structure

```
quizitnow-landing/
├── src/
│   ├── App.jsx              # Main router component
│   ├── App.css              # Styling with animations
│   ├── index.css            # Base styles
│   ├── main.jsx             # React entry point
│   └── pages/
│       ├── Home.jsx         # Landing page (6 buttons)
│       ├── CosmicWordPlay.jsx
│       ├── ZoomableEarth.jsx
│       ├── GuessMyNeon.jsx
│       ├── QuizItNowGame.jsx
│       ├── RecipeGenerator.jsx
│       └── OXBullCow.jsx
├── public/                  # Static assets
├── dist/                    # Build output (generated)
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
└── .github/
    └── workflows/
        └── build-deploy.yml # GitHub Actions workflow
```

---

## ✨ Project Complete

**QuizItNow.com is ready for users to enjoy an amazing gaming platform!**

---

**Made with ❤️ using React + Vite**  
**Status:** Production Ready ✅

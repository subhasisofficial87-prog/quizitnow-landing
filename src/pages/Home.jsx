import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BookOpen,
  Globe,
  Calculator,
  Brain,
  ChefHat,
  Target,
  Sparkles,
  Lock,
  Sun,
  Moon
} from 'lucide-react'
import AI3DLogo from '../components/AI3DLogo'

const apps = [
  {
    id: 1,
    name: 'Word Play',
    icon: BookOpen,
    color: '#90EE90',
    route: '/cosmic-word-play',
    delay: 0.1
  },
  {
    id: 2,
    name: 'Zoomable Earth',
    icon: Globe,
    color: '#00ff88',
    route: '/zoomable-earth',
    delay: 0.2
  },
  {
    id: 3,
    name: 'Guess My Number',
    icon: Calculator,
    color: '#ff0080',
    route: '/guess-my-neon',
    delay: 0.3
  },
  {
    id: 4,
    name: 'Quiz Master',
    icon: Brain,
    color: '#b026ff',
    route: '/quizitnow',
    delay: 0.4
  },
  {
    id: 5,
    name: 'Recipe Generator',
    icon: ChefHat,
    color: '#ff6b00',
    route: '/recipe-generator',
    delay: 0.5
  },
  {
    id: 6,
    name: 'OX Bull Cow',
    icon: Target,
    color: '#00d4ff',
    route: '/ox-bull-cow',
    delay: 0.6
  },
  {
    id: 7,
    name: 'Glow Dots',
    icon: Sparkles,
    color: '#ff1493',
    route: '/glow-dots',
    delay: 0.7
  },
  {
    id: 8,
    name: 'GlowCrack',
    icon: Lock,
    color: '#00ff9f',
    route: '/glow-crack',
    delay: 0.8
  }
]

function Home() {
  const [hoveredId, setHoveredId] = useState(null)
  const [darkMode, setDarkMode] = useState(true)
  const navigate = useNavigate()

  // Load dark mode preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) {
      setDarkMode(JSON.parse(saved))
    }
  }, [])

  // Apply dark mode class and save preference
  useEffect(() => {
    const app = document.querySelector('.app')
    if (app) {
      if (darkMode) {
        app.classList.add('dark-mode')
        app.classList.remove('light-mode')
      } else {
        app.classList.remove('dark-mode')
        app.classList.add('light-mode')
      }
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const handleButtonClick = (route) => {
    navigate(route)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // Generate snowflakes
  const snowflakes = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 10,
    size: 2 + Math.random() * 8,
    opacity: 0.3 + Math.random() * 0.7,
    sway: Math.random() * 100
  }))

  return (
    <div className="app">
      <div className="background">
        <div className="snowfall">
          {snowflakes.map((flake) => (
            <div
              key={flake.id}
              className="snowflake"
              style={{
                left: `${flake.left}%`,
                '--delay': `${flake.delay}s`,
                '--duration': `${flake.duration}s`,
                '--size': `${flake.size}px`,
                '--opacity': flake.opacity,
                '--sway': `${flake.sway}px`
              }}
            />
          ))}
        </div>
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>
      </div>

      <div className="container">
        <div className="header">
          <button className="theme-toggle" onClick={toggleDarkMode} title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <div className="logo-section">
            <AI3DLogo />
            <h1 className="title">
              <span className="title-main">Quiz It Now</span>
              <span className="title-sub">Your Gateway to Amazing Quiz & Game Apps</span>
            </h1>
          </div>
        </div>

        <div className="buttons-grid">
          {apps.map((app) => {
            const IconComponent = app.icon
            return (
              <button
                key={app.id}
                onClick={() => handleButtonClick(app.route)}
                className={`app-button ${hoveredId === app.id ? 'hovered' : ''}`}
                style={{
                  '--color': app.color,
                  '--delay': `${app.delay}s`,
                  animationDelay: `${app.delay}s`
                }}
                onMouseEnter={() => setHoveredId(app.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="button-icon">
                  <IconComponent size={48} />
                </div>
                <span className="button-text">{app.name}</span>
                <div className="button-glow"></div>
              </button>
            )
          })}
        </div>

        <footer className="footer">
          <p>Click any button to explore amazing quiz and game experiences</p>
          <p className="footer-sub">Built with Cortex 🧠     Powered by Vortex 🕳️</p>
          <div className="footer-links">
            <a href="/terms" className="footer-link">Terms of Service</a>
            <span className="footer-separator">•</span>
            <a href="/privacy" className="footer-link">Privacy Policy</a>
            <span className="footer-separator">•</span>
            <a href="mailto:hello@quizitnow.com" className="footer-link">Support: hello@quizitnow.com</a>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Home

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Zap,
  Globe,
  Gamepad2,
  Brain,
  ChefHat,
  Target,
  Sun,
  Moon
} from 'lucide-react'
import AI3DLogo from '../components/AI3DLogo'

const apps = [
  {
    id: 1,
    name: 'Word Play',
    icon: Zap,
    color: '#00ffff',
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
    icon: Gamepad2,
    color: '#ff0080',
    route: '/guess-my-neon',
    delay: 0.3
  },
  {
    id: 4,
    name: 'QuizItNow',
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
          <p className="footer-sub">Built with Cortex 🧠     Powered by Vortex 🌌</p>
        </footer>
      </div>
    </div>
  )
}

export default Home

import './App.css'
import { useState } from 'react'
import {
  Zap,
  Globe,
  Gamepad2,
  Brain,
  ChefHat,
  Target
} from 'lucide-react'

const apps = [
  {
    id: 1,
    name: 'Cosmic Word Play',
    icon: Zap,
    color: '#00ffff',
    route: '/cosmic-word-play/',
    delay: 0.1
  },
  {
    id: 2,
    name: 'Zoomable Earth',
    icon: Globe,
    color: '#00ff88',
    route: '/zoomable-earth/',
    delay: 0.2
  },
  {
    id: 3,
    name: 'Guess My Neon',
    icon: Gamepad2,
    color: '#ff0080',
    route: '/guess-my-neon/',
    delay: 0.3
  },
  {
    id: 4,
    name: 'QuizItNow',
    icon: Brain,
    color: '#b026ff',
    route: '/quizitnow/',
    delay: 0.4
  },
  {
    id: 5,
    name: 'Recipe Generator',
    icon: ChefHat,
    color: '#ff6b00',
    route: '/recipe-generator/',
    delay: 0.5
  },
  {
    id: 6,
    name: 'OX Bull Cow',
    icon: Target,
    color: '#00d4ff',
    route: '/ox-bull-cow/',
    delay: 0.6
  }
]

function App() {
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <div className="app">
      <div className="background">
        <div className="grid-bg"></div>
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>
      </div>

      <div className="container">
        <div className="header">
          <h1 className="title">
            <span className="title-main">QuizItNow</span>
            <span className="title-sub">Your Gateway to Amazing Quiz & Game Apps</span>
          </h1>
        </div>

        <div className="buttons-grid">
          {apps.map((app) => {
            const IconComponent = app.icon
            return (
              <a
                key={app.id}
                href={app.route}
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
              </a>
            )
          })}
        </div>

        <footer className="footer">
          <p>Click any button to explore amazing quiz and game experiences</p>
          <p className="footer-sub">Built with React • Powered by Vite</p>
        </footer>
      </div>
    </div>
  )
}

export default App

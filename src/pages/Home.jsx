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
  Moon,
  Lightbulb,
  Trophy,
  HelpCircle,
  X
} from 'lucide-react'
import AI3DLogo from '../components/AI3DLogo'

const gameCategories = [
  {
    id: 'logic',
    title: '🧩 Logic & Code-Breaking Games',
    description: 'Challenge your problem-solving skills with puzzles and strategic games',
    color: '#00d4ff',
    games: [
      {
        id: 3,
        name: 'Guess My Number',
        icon: Calculator,
        color: '#ff0080',
        route: '/guess-my-neon',
        type: 'Deduction Game'
      },
      {
        id: 6,
        name: 'OX Bull Cow',
        icon: Target,
        color: '#00d4ff',
        route: '/ox-bull-cow',
        type: 'Code-Breaking'
      },
      {
        id: 8,
        name: 'GlowCrack',
        icon: Lock,
        color: '#00ff9f',
        route: '/glow-crack',
        type: 'Mastermind Puzzle'
      },
      {
        id: 7,
        name: 'Glow Dots',
        icon: Sparkles,
        color: '#ff1493',
        route: '/glow-dots',
        type: 'Strategy Game'
      }
    ]
  },
  {
    id: 'luck',
    title: '🎰 Try Your Luck',
    description: 'Test your fortune with high-stakes games and exciting challenges',
    color: '#ff6b6b',
    games: [
      {
        id: 12,
        name: 'Deal or No Deal',
        icon: Trophy,
        color: '#ffb700',
        route: '/deal-or-no-deal',
        type: 'High-Stakes Game',
        howToPlay: {
          short: 'Pick a briefcase as your prize, then eliminate other cases through rounds. After each round, the Banker offers you money based on remaining values. Accept the offer to win it, or keep playing and risk it all to reach your original case!',
          long: `1. Start Game: Click "Start Game" to begin your high-stakes adventure.

2. Pick Your Briefcase: From 16 briefcases, select ONE case that will be your final prize. This case will remain locked until the end.

3. Round 1 - Open 5 Cases: In the first round, you must open 5 other briefcases. Click on any unopened case to reveal its value (₹1 to ₹10,00,000). The values disappear from play.

4. Banker's First Offer: After opening 5 cases, the Banker appears and offers you money based on the remaining values. This offer is usually LOW because the Banker has an advantage early on.

5. Make Your Decision: You have two choices:
   • DEAL: Accept the Banker's offer and win that amount immediately. The game ends.
   • NO DEAL: Reject the offer and continue to the next round. You risk getting a worse offer later.

6. Subsequent Rounds (2-5): Repeat the process, opening fewer cases each round:
   • Round 2: Open 4 cases
   • Round 3: Open 3 cases
   • Round 4: Open 2 cases
   • Round 5: Open 1 case

7. Banker's Changing Strategy: As rounds progress, the Banker's offers improve because there are fewer cases left and the pressure increases on the banker.

8. Final Reveal: After Round 5, when only your original case remains, your briefcase is automatically opened. You see what you originally picked!

9. Compare & Win: If you accepted a Deal earlier, you get that amount. If you rejected all deals, you get whatever was in your final case.

10. Play Again: Win big or learn from your strategy - replay as many times as you want to master the game!

STRATEGY TIPS: Pay attention to which values get eliminated. High remaining values mean better offers coming. Trust your instincts and remember - the longer you play, the bigger the risks but also the bigger the potential rewards!`
        }
      }
    ]
  },
  {
    id: 'learning',
    title: '🧠 Knowledge & Learning Games',
    description: 'Test your knowledge and expand your mind with educational experiences',
    color: '#b026ff',
    games: [
      {
        id: 1,
        name: 'Word Play',
        icon: BookOpen,
        color: '#90EE90',
        route: '/cosmic-word-play',
        type: 'Word Game'
      },
      {
        id: 4,
        name: 'Quiz Master',
        icon: Brain,
        color: '#b026ff',
        route: '/quizitnow',
        type: 'Quiz Game'
      },
      {
        id: 2,
        name: 'Zoomable Earth',
        icon: Globe,
        color: '#00ff88',
        route: '/zoomable-earth',
        type: 'Interactive Learning'
      }
    ]
  },
  {
    id: 'creative',
    title: '🎨 Creative & Utility Tools',
    description: 'Explore creative tools and utilities for inspiration and assistance',
    color: '#ff6b00',
    games: [
      {
        id: 5,
        name: 'Recipe Generator',
        icon: ChefHat,
        color: '#ff6b00',
        route: '/recipe-generator',
        type: 'Creative Tool'
      }
    ]
  }
]

const apps = gameCategories.flatMap(cat =>
  cat.games.map((game, index) => ({
    ...game,
    delay: 0.1 + index * 0.1,
    category: cat.id
  }))
)

function Home() {
  const [hoveredId, setHoveredId] = useState(null)
  const [darkMode, setDarkMode] = useState(true)
  const [selectedGameHelp, setSelectedGameHelp] = useState(null)
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

        <div className="games-container">
          {gameCategories.map((category) => (
            <section key={category.id} className="game-category">
              <div className="category-header">
                <h2 className="category-title" style={{ color: category.color }}>
                  {category.title}
                </h2>
                <p className="category-description">{category.description}</p>
              </div>

              <div className="category-grid">
                {category.games.map((app, index) => {
                  const IconComponent = app.icon
                  return (
                    <div key={app.id} className="button-wrapper">
                      <button
                        onClick={() => handleButtonClick(app.route)}
                        className={`app-button ${hoveredId === app.id ? 'hovered' : ''}`}
                        style={{
                          '--color': app.color,
                          '--delay': `${0.1 + index * 0.1}s`,
                          animationDelay: `${0.1 + index * 0.1}s`
                        }}
                        onMouseEnter={() => setHoveredId(app.id)}
                        onMouseLeave={() => setHoveredId(null)}
                      >
                        <div className="button-icon">
                          <IconComponent size={48} />
                        </div>
                        <div className="button-content">
                          <span className="button-text">{app.name}</span>
                          <span className="button-type">{app.type}</span>
                        </div>
                        <div className="button-glow"></div>
                      </button>
                      {app.howToPlay && (
                        <button
                          className="help-button-small"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedGameHelp(app)
                          }}
                          title="How To Play"
                          style={{ '--color': app.color }}
                        >
                          <HelpCircle size={20} />
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>
          ))}
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

        {/* Help Modal */}
        {selectedGameHelp && (
          <div className="help-modal-overlay" onClick={() => setSelectedGameHelp(null)}>
            <div className="help-modal" onClick={(e) => e.stopPropagation()}>
              <button
                className="help-modal-close"
                onClick={() => setSelectedGameHelp(null)}
              >
                <X size={24} />
              </button>

              <h2 className="help-modal-title" style={{ color: selectedGameHelp.color }}>
                {selectedGameHelp.name} - How To Play
              </h2>

              <div className="help-modal-content">
                <div className="help-section">
                  <h3>Quick Overview</h3>
                  <p>{selectedGameHelp.howToPlay.short}</p>
                </div>

                <div className="help-section">
                  <h3>Step-by-Step Guide</h3>
                  <p className="help-long-description">
                    {selectedGameHelp.howToPlay.long.split('\n').map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
              </div>

              <button
                className="help-modal-button"
                onClick={() => {
                  setSelectedGameHelp(null)
                  navigate(selectedGameHelp.route)
                }}
                style={{ borderColor: selectedGameHelp.color }}
              >
                Play {selectedGameHelp.name}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home

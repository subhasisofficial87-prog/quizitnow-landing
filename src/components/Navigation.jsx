import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import './Navigation.css'

const apps = [
  { name: 'Cosmic Word Play', path: '/cosmic-word-play/' },
  { name: 'Zoomable Earth', path: '/zoomable-earth/' },
  { name: 'Guess My Neon', path: '/guess-my-neon/' },
  { name: 'QuizItNow', path: '/quizitnow/' },
  { name: 'Recipe Generator', path: '/recipe-generator/' },
]

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="navigation slide-down-fade">
      <div className="nav-container">
        <a href="/" className="nav-logo">
          <span className="logo-text">QuizItNow</span>
          <span className="logo-dot">.</span>
          <span className="logo-com">com</span>
        </a>

        {/* Desktop Menu */}
        <div className="nav-menu-desktop">
          {apps.map((app) => (
            <a key={app.name} href={app.path} className="nav-link">
              {app.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="nav-menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="nav-menu-mobile">
          {apps.map((app) => (
            <a
              key={app.name}
              href={app.path}
              className="nav-link-mobile"
              onClick={() => setIsMenuOpen(false)}
            >
              {app.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

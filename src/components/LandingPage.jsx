import { Zap, Globe, Gamepad2, Brain, ChefHat, BookOpen, Target } from 'lucide-react'
import AppCard from './AppCard'
import './LandingPage.css'

const appsList = [
  {
    name: 'Cosmic Word Play',
    icon: BookOpen,
    description: 'Challenge your vocabulary and linguistic skills in this cosmic word adventure.',
    route: '/cosmic-word-play/',
  },
  {
    name: 'Zoomable Earth',
    icon: Globe,
    description: 'Explore the world with interactive maps and zoom features.',
    route: '/zoomable-earth/',
  },
  {
    name: 'Guess My Neon',
    icon: Gamepad2,
    description: 'Test your logic in this neon-styled number guessing game.',
    route: '/guess-my-neon/',
  },
  {
    name: 'QuizItNow',
    icon: Brain,
    description: 'Put your knowledge to the test with challenging quizzes.',
    route: '/quizitnow/',
  },
  {
    name: 'Recipe Generator',
    icon: ChefHat,
    description: 'Discover amazing recipes and expand your culinary horizons.',
    route: '/recipe-generator/',
  },
  {
    name: 'OX Bull Cow',
    icon: Target,
    description: 'Crack the secret code! A classic guessing game with bulls and cows.',
    route: '/ox-bull-cow/',
  },
]

export default function LandingPage() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content fade-in">
          <div className="hero-badge slide-up-fade" style={{ animationDelay: '0.2s' }}>
            <Zap size={16} />
            <span>Welcome to Quiz & Game Platform</span>
          </div>

          <h1 className="hero-title" style={{ animationDelay: '0.3s' }}>
            <span className="title-main slide-up-fade">Quiz It Now</span>
            <span className="title-glow slide-up-fade" style={{ animationDelay: '0.4s' }}>
              Your Gateway to Amazing Apps
            </span>
          </h1>

          <p
            className="hero-subtitle slide-up-fade"
            style={{ animationDelay: '0.5s' }}
          >
            Explore our collection of interactive games, quizzes, and tools designed to
            entertain and educate. Pick your favorite and start playing now!
          </p>

          <div className="hero-cta slide-up-fade" style={{ animationDelay: '0.6s' }}>
            <a href="#apps" className="cta-button">
              Explore Apps
              <span className="button-arrow">→</span>
            </a>
            <p className="cta-subtitle">Scroll down to discover all available apps</p>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="hero-bg">
          <div className="glow-orb orb-1"></div>
          <div className="glow-orb orb-2"></div>
          <div className="glow-orb orb-3"></div>
          <div className="grid-bg"></div>
        </div>
      </section>

      {/* Apps Grid Section */}
      <section className="apps-section" id="apps">
        <div className="apps-container">
          <h2 className="apps-title slide-up-fade">Available Apps</h2>
          <p className="apps-subtitle slide-up-fade" style={{ animationDelay: '0.1s' }}>
            Choose from our collection of interactive applications
          </p>

          <div className="apps-grid">
            {appsList.map((app, index) => (
              <AppCard
                key={app.name}
                appName={app.name}
                icon={app.icon}
                description={app.description}
                route={app.route}
                delay={0.1 + index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 QuizItNow. All rights reserved.</p>
          <p className="footer-note">Built with React, Vite, and a lot of creativity.</p>
        </div>
      </footer>
    </div>
  )
}

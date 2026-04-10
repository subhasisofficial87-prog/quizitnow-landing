import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import CosmicWordPlay from './pages/CosmicWordPlay'
import ZoomableEarth from './pages/ZoomableEarth'
import GuessMyNeon from './pages/GuessMyNeon'
import QuizItNowGame from './pages/QuizItNowGame'
import RecipeGenerator from './pages/RecipeGenerator'
import OXBullCow from './pages/OXBullCow'
import TermsOfService from './pages/TermsOfService'
import PrivacyPolicy from './pages/PrivacyPolicy'
import GlowDots from './pages/GlowDots'
import GlowCrack from './pages/GlowCrack'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cosmic-word-play" element={<CosmicWordPlay />} />
      <Route path="/zoomable-earth" element={<ZoomableEarth />} />
      <Route path="/guess-my-neon" element={<GuessMyNeon />} />
      <Route path="/quizitnow" element={<QuizItNowGame />} />
      <Route path="/recipe-generator" element={<RecipeGenerator />} />
      <Route path="/ox-bull-cow" element={<OXBullCow />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/glow-dots" element={<GlowDots />} />
      <Route path="/glow-crack" element={<GlowCrack />} />
    </Routes>
  )
}

export default App

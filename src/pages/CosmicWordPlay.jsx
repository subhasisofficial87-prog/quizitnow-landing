import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function CosmicWordPlay() {
  const navigate = useNavigate()

  return (
    <div className="game-page">
      <div className="game-header">
        <button onClick={() => navigate('/')} className="back-button">
          <ArrowLeft size={20} />
          Back to Home
        </button>
        <h1>Cosmic Word Play</h1>
      </div>
      <div className="game-container">
        {/* Game will be integrated here */}
        <div className="placeholder">
          <p>🌟 Cosmic Word Play</p>
          <p>Game Loading...</p>
        </div>
      </div>
    </div>
  )
}

export default CosmicWordPlay

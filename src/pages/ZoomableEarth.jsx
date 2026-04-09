import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function ZoomableEarth() {
  const navigate = useNavigate()

  return (
    <div className="game-page">
      <div className="game-header">
        <button onClick={() => navigate('/')} className="back-button">
          <ArrowLeft size={20} />
          Back to Home
        </button>
        <h1>Zoomable Earth</h1>
      </div>
      <div className="game-container">
        <div className="placeholder">
          <p>🌎 Zoomable Earth</p>
          <p>Game Loading...</p>
        </div>
      </div>
    </div>
  )
}

export default ZoomableEarth

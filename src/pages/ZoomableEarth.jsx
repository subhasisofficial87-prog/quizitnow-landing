import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function ZoomableEarth() {
  const navigate = useNavigate()

  return (
    <div className="game-page-wrapper">
      <div className="game-header">
        <button onClick={() => navigate('/')} className="back-button">
          <ArrowLeft size={20} />
          Back to Home
        </button>
        <h1>Zoomable Earth</h1>
      </div>
      <div className="game-container-full">
        <iframe
          src="https://zoomable-earth.lovable.app"
          title="Zoomable Earth"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '8px'
          }}
          allow="fullscreen"
        />
      </div>
    </div>
  )
}

export default ZoomableEarth

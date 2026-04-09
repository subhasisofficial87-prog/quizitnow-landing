import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function OXBullCow() {
  const navigate = useNavigate()
  return (
    <div className="game-page">
      <div className="game-header">
        <button onClick={() => navigate('/')} className="back-button">
          <ArrowLeft size={20} /> Back to Home
        </button>
        <h1>OX Bull Cow</h1>
      </div>
      <div className="game-container">
        <div className="placeholder">
          <p>🎯 OX Bull Cow</p>
          <p>Game Loading...</p>
        </div>
      </div>
    </div>
  )
}
export default OXBullCow

import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function RecipeGenerator() {
  const navigate = useNavigate()
  return (
    <div className="game-page">
      <div className="game-header">
        <button onClick={() => navigate('/')} className="back-button">
          <ArrowLeft size={20} /> Back to Home
        </button>
        <h1>Recipe Generator</h1>
      </div>
      <div className="game-container">
        <div className="placeholder">
          <p>👨‍🍳 Recipe Generator</p>
          <p>Game Loading...</p>
        </div>
      </div>
    </div>
  )
}
export default RecipeGenerator

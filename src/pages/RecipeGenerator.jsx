import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function RecipeGenerator() {
  const navigate = useNavigate()

  return (
    <div className="game-page-wrapper">
      <div className="game-header">
        <button onClick={() => navigate('/')} className="back-button">
          <ArrowLeft size={20} />
          Back to Home
        </button>
        <h1>Recipe Generator</h1>
      </div>
      <div className="game-container-full">
        <iframe
          src="https://recipe-generator.lovable.app"
          title="Recipe Generator"
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

export default RecipeGenerator

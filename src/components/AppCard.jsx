import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function AppCard({ appName, icon: Icon, description, route, delay = 0 }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a href={route}>
      <div
        className="app-card"
        style={{
          animation: `slideUpFade 0.8s ease-out ${delay}s both`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="app-card-icon">
          <Icon size={48} strokeWidth={1.5} />
        </div>

        <h3 className="app-card-title">{appName}</h3>
        <p className="app-card-description">{description}</p>

        <div className="app-card-footer">
          <button className="app-card-button">
            Play Now
            <ArrowRight size={16} style={{ marginLeft: '8px' }} />
          </button>
        </div>

        {isHovered && <div className="app-card-glow" />}
      </div>
    </a>
  )
}

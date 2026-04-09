import { useEffect, useRef } from 'react'
import './AI3DLogo.css'

function AI3DLogo() {
  const containerRef = useRef(null)
  const logoRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Add mouse movement for 3D rotation
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      const rotateX = (y - 0.5) * 30
      const rotateY = (x - 0.5) * 30

      logoRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }

    const handleMouseLeave = () => {
      logoRef.current.style.transform = 'rotateX(0) rotateY(0)'
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div className="ai-logo-container" ref={containerRef}>
      <div className="ai-logo" ref={logoRef}>
        {/* Outer rotating sphere */}
        <div className="logo-sphere outer-sphere">
          <div className="sphere-ring ring-1"></div>
          <div className="sphere-ring ring-2"></div>
          <div className="sphere-ring ring-3"></div>
        </div>

        {/* Central neural core */}
        <div className="neural-core">
          <div className="core-center"></div>

          {/* Neural network nodes */}
          <div className="neural-node node-1"></div>
          <div className="neural-node node-2"></div>
          <div className="neural-node node-3"></div>
          <div className="neural-node node-4"></div>
          <div className="neural-node node-5"></div>
          <div className="neural-node node-6"></div>

          {/* Neural connections */}
          <svg className="neural-connections" viewBox="0 0 200 200">
            <g opacity="0.6">
              <line x1="100" y1="100" x2="140" y2="80" stroke="#00ffff" strokeWidth="2" />
              <line x1="100" y1="100" x2="160" y2="120" stroke="#00ffff" strokeWidth="2" />
              <line x1="100" y1="100" x2="140" y2="160" stroke="#ff0080" strokeWidth="2" />
              <line x1="100" y1="100" x2="60" y2="160" stroke="#b026ff" strokeWidth="2" />
              <line x1="100" y1="100" x2="40" y2="120" stroke="#00ff88" strokeWidth="2" />
              <line x1="100" y1="100" x2="60" y2="60" stroke="#ff6b00" strokeWidth="2" />

              {/* Secondary connections */}
              <line x1="140" y1="80" x2="160" y2="120" stroke="#00d4ff" strokeWidth="1" opacity="0.5" />
              <line x1="160" y1="120" x2="140" y2="160" stroke="#00d4ff" strokeWidth="1" opacity="0.5" />
              <line x1="140" y1="160" x2="60" y2="160" stroke="#00d4ff" strokeWidth="1" opacity="0.5" />
              <line x1="60" y1="160" x2="40" y2="120" stroke="#00d4ff" strokeWidth="1" opacity="0.5" />
              <line x1="40" y1="120" x2="60" y2="60" stroke="#00d4ff" strokeWidth="1" opacity="0.5" />
              <line x1="60" y1="60" x2="140" y2="80" stroke="#00d4ff" strokeWidth="1" opacity="0.5" />
            </g>
          </svg>
        </div>

        {/* Floating particles */}
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
        <div className="particle particle-6"></div>

        {/* Light rays */}
        <div className="light-ray ray-1"></div>
        <div className="light-ray ray-2"></div>
        <div className="light-ray ray-3"></div>
      </div>

      {/* Glow effect */}
      <div className="logo-glow glow-1"></div>
      <div className="logo-glow glow-2"></div>
    </div>
  )
}

export default AI3DLogo

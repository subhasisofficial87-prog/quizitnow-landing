import { forwardRef, useEffect, useRef } from 'react'

const Confetti = forwardRef(({ theme }, ref) => {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animationRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', resizeCanvas)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current = particlesRef.current.filter((p) => p.life > 0)

      particlesRef.current.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.2 // gravity
        p.life--

        ctx.fillStyle = p.color
        ctx.globalAlpha = p.life / p.maxLife
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.globalAlpha = 1

      if (particlesRef.current.length > 0) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    const burst = (count = 50, x = window.innerWidth / 2, y = window.innerHeight / 2) => {
      const colors = [theme.confetti1, theme.confetti2, theme.confetti3]

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count
        const velocity = 5 + Math.random() * 5
        const vx = Math.cos(angle) * velocity
        const vy = Math.sin(angle) * velocity - 2

        particlesRef.current.push({
          x,
          y,
          vx,
          vy,
          size: 3 + Math.random() * 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 60 + Math.random() * 40,
          maxLife: 60 + Math.random() * 40
        })
      }

      animate()
    }

    if (ref) {
      ref.current = { burst }
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [theme, ref])

  return <canvas ref={canvasRef} className="confetti-canvas" />
})

Confetti.displayName = 'Confetti'

export default Confetti

import { forwardRef, useEffect, useRef } from 'react'

const MastermindConfetti = forwardRef(({ theme }, ref) => {
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
        p.vy += 0.15 // gravity
        p.life--
        p.rotation += p.rotationSpeed

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)

        if (p.type === 'circle') {
          ctx.fillStyle = p.color
          ctx.globalAlpha = p.life / p.maxLife
          ctx.beginPath()
          ctx.arc(0, 0, p.size, 0, Math.PI * 2)
          ctx.fill()
        } else if (p.type === 'star') {
          ctx.fillStyle = p.color
          ctx.globalAlpha = p.life / p.maxLife
          drawStar(ctx, 0, 0, 5, p.size, p.size * 0.5)
        }

        ctx.restore()
      })

      ctx.globalAlpha = 1

      if (particlesRef.current.length > 0) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    const drawStar = (ctx, cx, cy, spikes, outerRadius, innerRadius) => {
      let rot = Math.PI / 2 * 3
      let step = Math.PI / spikes

      ctx.beginPath()
      ctx.moveTo(cx, cy - outerRadius)
      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(cx + Math.cos(rot) * outerRadius, cy + Math.sin(rot) * outerRadius)
        rot += step

        ctx.lineTo(cx + Math.cos(rot) * innerRadius, cy + Math.sin(rot) * innerRadius)
        rot += step
      }
      ctx.lineTo(cx, cy - outerRadius)
      ctx.closePath()
      ctx.fill()
    }

    const burst = (pegColors = [], count = 50) => {
      const colors = pegColors.length > 0 ? pegColors : ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A']

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count
        const velocity = 6 + Math.random() * 6
        const vx = Math.cos(angle) * velocity
        const vy = Math.sin(angle) * velocity - 2

        const type = Math.random() > 0.6 ? 'star' : 'circle'

        particlesRef.current.push({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          vx,
          vy,
          size: 4 + Math.random() * 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 70 + Math.random() * 50,
          maxLife: 70 + Math.random() * 50,
          type,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.3
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

  return <canvas ref={canvasRef} className="mastermind-confetti-canvas" />
})

MastermindConfetti.displayName = 'MastermindConfetti'

export default MastermindConfetti

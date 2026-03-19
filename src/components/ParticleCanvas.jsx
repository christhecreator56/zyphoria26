import styles from './ParticleCanvas.module.css'
import { useEffect, useRef } from 'react'

export default function ParticleCanvas () {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let particles = []
    let animId

    function resize () {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    class Particle {
      constructor () { this.reset() }
      reset () {
        this.x     = Math.random() * canvas.width
        this.y     = Math.random() * canvas.height
        this.r     = Math.random() * 1.6 + 0.3
        this.alpha = Math.random() * 0.6 + 0.15
        this.speed = Math.random() * 0.003 + 0.002
        this.phase = Math.random() * Math.PI * 2
        this.drift = (Math.random() - 0.5) * 0.1
        this.vy    = (Math.random() - 0.5) * 0.03
      }
      update () {
        this.phase += this.speed
        this.x    += this.drift
        this.y    += this.vy
        if (this.x < 0)              this.x = canvas.width
        if (this.x > canvas.width)   this.x = 0
        if (this.y < 0)              this.y = canvas.height
        if (this.y > canvas.height)  this.y = 0
      }
      draw () {
        const a = this.alpha * (0.5 + 0.5 * Math.sin(this.phase))
        ctx.save()
        ctx.globalAlpha  = a
        ctx.fillStyle    = `hsl(${48 + Math.random() * 15}, 100%, 95%)`
        ctx.shadowColor  = 'rgba(255, 240, 120, 0.9)'
        ctx.shadowBlur   = 7
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    function initParticles () {
      const count = Math.floor((canvas.width * canvas.height) / 8000)
      particles = Array.from({ length: count }, () => new Particle())
    }

    function loop () {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw() })
      animId = requestAnimationFrame(loop)
    }

    resize()
    loop()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} />
}

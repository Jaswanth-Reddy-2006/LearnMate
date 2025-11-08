import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  radius: number
  baseOpacity: number
  twinkleSpeed: number
  distance: number
  color: string
  parallax: number
}

const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const animationRef = useRef<number | null>(null)
  const timeRef = useRef(0)
  const mouseXRef = useRef(0)
  const mouseYRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initializeStars = () => {
      const stars: Star[] = []
      const starCount = Math.floor((canvas.width * canvas.height) / 6000)
      const colors = ['#E6E6E6', '#00FFFF', '#9B5DE5', '#F15BB5', '#FEE440']

      for (let i = 0; i < starCount; i++) {
        const rand = Math.random()
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.2 + 0.4,
          baseOpacity: Math.random() * 0.6 + 0.3,
          twinkleSpeed: Math.random() * 0.04 + 0.01,
          distance: Math.random() * 100,
          color: colors[Math.floor(rand * colors.length)],
          parallax: Math.random() * 0.3 + 0.05,
        })
      }
      starsRef.current = stars
    }

    const drawStars = () => {
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
      )
      gradient.addColorStop(0, '#0D1B2A')
      gradient.addColorStop(1, '#050510')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      timeRef.current += 0.016

      starsRef.current.forEach((star) => {
        const twinkle = Math.sin(timeRef.current * star.twinkleSpeed + star.distance) * 0.4 + 0.6
        const finalOpacity = star.baseOpacity * twinkle

        const parallaxX = (mouseXRef.current - canvas.width / 2) * star.parallax * 0.01
        const parallaxY = (mouseYRef.current - canvas.height / 2) * star.parallax * 0.01

        const x = star.x + parallaxX
        const y = star.y + parallaxY

        ctx.fillStyle = star.color.replace(')', `, ${finalOpacity})`)
          .replace('rgb', 'rgba')
          .replace('rgba(', `rgba(${parseInt(star.color.slice(1, 3), 16)}, ${parseInt(star.color.slice(3, 5), 16)}, ${parseInt(star.color.slice(5, 7), 16)}, `)

        if (star.color === '#00FFFF') {
          ctx.fillStyle = `rgba(0, 255, 255, ${finalOpacity})`
        } else if (star.color === '#9B5DE5') {
          ctx.fillStyle = `rgba(155, 93, 229, ${finalOpacity})`
        } else if (star.color === '#F15BB5') {
          ctx.fillStyle = `rgba(241, 91, 181, ${finalOpacity})`
        } else if (star.color === '#FEE440') {
          ctx.fillStyle = `rgba(254, 228, 64, ${finalOpacity})`
        } else {
          ctx.fillStyle = `rgba(230, 230, 230, ${finalOpacity})`
        }

        ctx.beginPath()
        ctx.arc(x, y, star.radius, 0, Math.PI * 2)
        ctx.fill()

        if (star.radius > 0.6) {
          ctx.strokeStyle = ctx.fillStyle.replace(')', ', 0.3)')
          ctx.lineWidth = 0.3
          ctx.stroke()
        }
      })
    }

    const animate = () => {
      drawStars()
      animationRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX
      mouseYRef.current = e.clientY
    }

    resizeCanvas()
    initializeStars()
    animate()

    const handleResize = () => {
      resizeCanvas()
      initializeStars()
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0, display: 'block' }}
    />
  )
}

export default Starfield

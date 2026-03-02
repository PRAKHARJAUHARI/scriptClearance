// src/components/Spotlight.tsx
import { useRef, useEffect, useState } from 'react'

interface SpotlightProps {
  children: React.ReactNode
  className?: string
}

export function Spotlight({ children, className = '' }: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setMousePosition({ x, y })
    }

    const handleMouseLeave = () => {
      setMousePosition({ x: -1000, y: -1000 })
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.06), transparent 80%)`,
        transition: 'background 0.3s ease-out',
      }}
    >
      {children}
    </div>
  )
}

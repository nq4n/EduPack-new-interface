'use client'

import { useEffect, useState } from 'react'

export default function AnimatedScormBg() {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 6
      setOffset({ x, y })
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <span
          key={i}
          className="scorm-block"
          style={{
            left: `${10 + i * 10}%`,
            animationDelay: `${i * 1.5}s`,
            animationDuration: `${3 + i * 1}s`,
            transform: `translate(${offset.x}px, ${offset.y}px)`,
          }}
        />
      ))}
    </>
  )
}

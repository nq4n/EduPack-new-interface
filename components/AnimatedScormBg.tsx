'use client'

import { useEffect, useState, useRef } from 'react'

interface BlockConfig {
  id: number
  left: number
  duration: number
  delay: number
  randomX: number
  randomY: number
  size: 'sm' | 'md' | 'lg'
  opacity: number
}

interface BlockPosition {
  id: number
  x: number
  y: number
}

export default function AnimatedScormBg() {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [blocks, setBlocks] = useState<BlockConfig[]>([])
  const [blockPositions, setBlockPositions] = useState<Map<number, BlockPosition>>(new Map())
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const blockRefsMap = useRef<Map<number, HTMLElement | null>>(new Map())

  // Initialize blocks with random properties
  useEffect(() => {
    const newBlocks: BlockConfig[] = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: Math.random() * 90 + 5,
      duration: Math.random() * 3 + 5,
      delay: Math.random() * 2,
      randomX: (Math.random() - 0.5) * 100,
      randomY: (Math.random() - 0.5) * 50,
      size: ['sm', 'md', 'lg'][Math.floor(Math.random() * 3)] as 'sm' | 'md' | 'lg',
      opacity: Math.random() * 0.3 + 0.4,
    }))
    setBlocks(newBlocks)
  }, [])

  // Make blocks flee from mouse
  useEffect(() => {
    if (!isHovering) return

    const fleeInterval = setInterval(() => {
      const newPositions = new Map(blockPositions)

      blocks.forEach((block) => {
        const blockEl = blockRefsMap.current.get(block.id)
        if (!blockEl) return

        const rect = blockEl.getBoundingClientRect()
        const blockCenterX = rect.left + rect.width / 2
        const blockCenterY = rect.top + rect.height / 2

        const dx = blockCenterX - mousePos.x
        const dy = blockCenterY - mousePos.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Flee radius
        if (distance < 200) {
          const angle = Math.atan2(dy, dx)
          const fleeDistance = 60
          const newX = Math.cos(angle) * fleeDistance
          const newY = Math.sin(angle) * fleeDistance

          newPositions.set(block.id, {
            id: block.id,
            x: newX,
            y: newY,
          })
        } else {
          newPositions.delete(block.id)
        }
      })

      setBlockPositions(newPositions)
    }, 30)

    return () => clearInterval(fleeInterval)
  }, [blocks, mousePos, isHovering, blockPositions])

  // Mouse tracking for parallax effect
  const handleMouseMove = (e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
    setIsHovering(true)

    const x = (e.clientX / window.innerWidth - 0.5) * 30
    const y = (e.clientY / window.innerHeight - 0.5) * 15
    setOffset({ x, y })
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setBlockPositions(new Map())
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <>
      {blocks.map((block) => {
        const fleePos = blockPositions.get(block.id)
        const baseX = offset.x * (0.5 + block.id * 0.05)
        const baseY = offset.y * (0.5 + block.id * 0.05)
        const finalX = fleePos ? baseX + fleePos.x : baseX
        const finalY = fleePos ? baseY + fleePos.y : baseY

        return (
          <span
            key={block.id}
            ref={(el) => {
              if (el) blockRefsMap.current.set(block.id, el)
            }}
            className={`scorm-block scorm-block-${block.size}`}
            style={{
              left: `${block.left}%`,
              animationDelay: `${block.delay}s`,
              animationDuration: `${block.duration}s`,
              opacity: block.opacity,
              '--random-x': `${block.randomX}px`,
              '--random-y': `${block.randomY}px`,
              transform: `translate(${finalX}px, ${finalY}px)`,
              transition: isHovering ? 'transform 0.15s ease-out' : 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            } as React.CSSProperties}
          />
        )
      })}
    </>
  )
}

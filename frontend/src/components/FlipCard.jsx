import { useMemo, useState } from 'react'

export default function FlipCard({ front, back, className = '', duration = 600 }) {
  const [flipped, setFlipped] = useState(false)
  const canHover = useMemo(
    () => window.matchMedia?.('(hover: hover)').matches ?? true,
    [],
  )

  const flip = (v) => setFlipped(v)
  const toggle = () => setFlipped((f) => !f)

  return (
    <div
      className={`group relative ${className}`}
      style={{ perspective: '1200px' }}
      onClick={canHover ? undefined : toggle}
      onMouseEnter={canHover ? () => flip(true) : undefined}
      onMouseLeave={canHover ? () => flip(false) : undefined}
    >
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: `transform ${duration}ms cubic-bezier(0.4, 0.2, 0.2, 1)`,
        }}
      >
        <div className="absolute inset-0 z-10" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
          {front}
        </div>
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {back}
        </div>
      </div>
    </div>
  )
}
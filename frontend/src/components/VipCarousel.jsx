import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function formatPrecio(precio) {
  return `${Number(precio).toLocaleString('es-ES', { minimumFractionDigits: 0 })} CUP`
}

// Configuración visual de cada posición (−2, −1, 0, +1, +2)
const POSITIONS = {
  '-2': { x: '-155%', scale: 0.62, zIndex: 1, opacity: 0.55, brightness: 0.7 },
  '-1': { x: '-82%',  scale: 0.78, zIndex: 2, opacity: 0.80, brightness: 0.85 },
   '0': { x: '0%',    scale: 1.00, zIndex: 3, opacity: 1.00, brightness: 1.0  },
   '1': { x: '82%',   scale: 0.78, zIndex: 2, opacity: 0.80, brightness: 0.85 },
   '2': { x: '155%',  scale: 0.62, zIndex: 1, opacity: 0.55, brightness: 0.7  },
}

// Colores de fondo por posición (crema para los lados, terracota para el centro)
const CARD_BG = {
  '-2': '#c8a882',
  '-1': '#b5a48a',
   '0': '#8B3A1A',
   '1': '#b5a48a',
   '2': '#8a7a62',
}

export default function VipCarousel({ productos = [] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const total = productos.length

  const goTo = useCallback((newIndex) => {
    if (newIndex === activeIndex || total === 0) return
    setDirection(newIndex > activeIndex ? 1 : -1)
    setActiveIndex((newIndex + total) % total)
  }, [activeIndex, total])

  const prev = () => goTo(activeIndex - 1)
  const next = () => goTo(activeIndex + 1)

  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-amber-200/60 font-inter text-sm">
        Sin productos en esta categoría
      </div>
    )
  }

  // Construimos los índices visibles: posiciones −2 a +2
  const visibleSlots = [-2, -1, 0, 1, 2]

  return (
    <div className="flex flex-col items-center select-none w-full">
      {/* Contenedor principal del carrusel */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{ height: '340px' }}
      >
        {/* Flecha izquierda */}
        <button
          onClick={prev}
          aria-label="Anterior"
          className="absolute left-0 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
          style={{ background: 'rgba(255,255,255,0.85)', boxShadow: '0 2px 12px rgba(0,0,0,0.18)', left: '4px' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-amber-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Tarjetas */}
        <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1200px' }}>
          {visibleSlots.map((slot) => {
            const itemIndex = (activeIndex + slot + total * 10) % total
            const producto = productos[itemIndex]
            const pos = POSITIONS[String(slot)]
            const bg = CARD_BG[String(slot)]
            const isCenter = slot === 0

            return (
              <motion.div
                key={`${slot}-${itemIndex}`}
                animate={{
                  x: pos.x,
                  scale: pos.scale,
                  opacity: pos.opacity,
                  zIndex: pos.zIndex,
                }}
                transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                onClick={() => !isCenter && goTo(activeIndex + slot)}
                className="absolute"
                style={{
                  width: '168px',
                  cursor: isCenter ? 'default' : 'pointer',
                  filter: `brightness(${pos.brightness})`,
                  transformOrigin: 'center center',
                }}
              >
                <div
                  className="relative rounded-2xl overflow-hidden flex flex-col"
                  style={{
                    background: bg,
                    height: isCenter ? '290px' : '240px',
                    boxShadow: isCenter
                      ? '0 16px 48px rgba(0,0,0,0.45)'
                      : '0 6px 20px rgba(0,0,0,0.25)',
                    transition: 'height 0.3s ease',
                  }}
                >
                  {/* Icono campana solo en la tarjeta central */}
                  {isCenter && (
                    <div
                      className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ background: '#C04A1A', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.35 2.7A1 1 0 007 17h10a1 1 0 00.95-1.3L17 13M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" />
                      </svg>
                    </div>
                  )}

                  {/* Imagen del producto */}
                  <div className="flex-1 overflow-hidden" style={{ borderRadius: '14px 14px 0 0' }}>
                    {producto?.imagen_url ? (
                      <img
                        src={producto.imagen_url}
                        alt={producto?.nombre}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        draggable={false}
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ background: 'rgba(255,255,255,0.12)' }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 opacity-40" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Dot inferior */}
                  <div className="flex justify-center items-center py-3">
                    <div
                      className="rounded-full"
                      style={{
                        width: isCenter ? '14px' : '10px',
                        height: isCenter ? '14px' : '10px',
                        background: isCenter ? '#C04A1A' : 'rgba(255,255,255,0.5)',
                        boxShadow: isCenter ? '0 0 0 3px rgba(192,74,26,0.3)' : 'none',
                        transition: 'all 0.3s ease',
                      }}
                    />
                  </div>
                </div>

                {/* Info debajo de la tarjeta central */}
                {isCenter && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 text-center px-2"
                  >
                    <p className="font-playfair font-semibold text-base leading-tight line-clamp-2"
                      style={{ color: '#5a2d0c' }}>
                      {producto?.nombre}
                    </p>
                    {producto?.precio && (
                      <p className="font-inter text-sm font-semibold mt-1"
                        style={{ color: '#B8860B' }}>
                        {formatPrecio(producto.precio)}
                      </p>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Flecha derecha */}
        <button
          onClick={next}
          aria-label="Siguiente"
          className="absolute right-0 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
          style={{ background: 'rgba(255,255,255,0.85)', boxShadow: '0 2px 12px rgba(0,0,0,0.18)', right: '4px' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-amber-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots de paginación */}
      <div className="flex items-center gap-2 mt-2">
        {productos.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir al producto ${i + 1}`}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === activeIndex ? '20px' : '7px',
              height: '7px',
              background: i === activeIndex ? '#C04A1A' : 'rgba(255,255,255,0.35)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

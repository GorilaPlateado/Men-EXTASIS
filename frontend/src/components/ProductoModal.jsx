/**
 * ProductoModal — lightbox de detalle de producto.
 * Se abre al hacer clic en cualquier producto (carrusel VIP o galería).
 * Se cierra con: botón X, clic en el overlay, o tecla Escape.
 */
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function formatPrecio(precio) {
  return `${Number(precio).toLocaleString('es-ES', { minimumFractionDigits: 2 })} CUP`
}

export default function ProductoModal({ producto, onClose }) {
  // Cerrar con Escape
  useEffect(() => {
    if (!producto) return
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [producto, onClose])

  // Bloquear scroll del body mientras el modal está abierto
  useEffect(() => {
    if (producto) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [producto])

  return (
    <AnimatePresence>
      {producto && (
        // Overlay
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-auto"
          style={{ background: 'rgba(5, 2, 1, 0.85)', backdropFilter: 'blur(6px)' }}
          aria-modal="true"
          role="dialog"
          aria-label={`Detalle de ${producto.nombre}`}
        >
          {/* Tarjeta del modal — detener propagación para no cerrar al clicar dentro */}
          <motion.div
            key="modal-card"
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 24 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
            style={{
              background: 'linear-gradient(160deg, #1a0804 0%, #2d1206 100%)',
              border: '1px solid rgba(212,175,55,0.25)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.7)',
            }}
          >
            {/* Botón cerrar */}
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
              style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Imagen */}
            <div className="w-full aspect-video overflow-hidden bg-black/30">
              {producto.imagen_url ? (
                <img
                  src={producto.imagen_url}
                  alt={producto.nombre}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #1a0804, #3d1a08)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 opacity-20" fill="none"
                    viewBox="0 0 24 24" stroke="white" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Línea dorada */}
            <div className="h-px w-full"
              style={{ background: 'linear-gradient(90deg, transparent, #D4AF37 40%, #D4AF37 60%, transparent)' }} />

            {/* Contenido */}
            <div className="px-7 py-6">
              {/* Nombre */}
              <h2 className="font-playfair text-2xl font-bold text-white mb-2 leading-tight">
                {producto.nombre}
              </h2>

              {/* Precio */}
              <div className="inline-flex items-center gap-2 mb-4">
                <span
                  className="font-inter text-lg font-bold px-3 py-1 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #8B3A1A, #C04A1A)',
                    color: '#fff',
                    boxShadow: '0 2px 12px rgba(139,58,26,0.5)',
                  }}
                >
                  {formatPrecio(producto.precio)}
                </span>
              </div>

              {/* Descripción */}
              {producto.descripcion ? (
                <p className="font-inter text-sm leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.65)' }}>
                  {producto.descripcion}
                </p>
              ) : (
                <p className="font-inter text-sm italic"
                  style={{ color: 'rgba(255,255,255,0.25)' }}>
                  Sin descripción disponible.
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

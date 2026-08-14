import { AnimatePresence, motion } from 'framer-motion'

function formatPrecio(precio) {
  return `${Number(precio).toLocaleString('es-ES', { minimumFractionDigits: 0 })} CUP`
}

export default function ProductModal({ producto, open, onClose }) {
  if (!open || !producto) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-3xl rounded-[28px] overflow-hidden bg-white shadow-2xl"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 rounded-full bg-black/10 text-black p-2 transition hover:bg-black/20"
            aria-label="Cerrar vista de producto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
              <path fill="currentColor" d="M18.3 5.7a1 1 0 0 0-1.4 0L12 10.6 7.1 5.7A1 1 0 0 0 5.7 7.1L10.6 12l-4.9 4.9a1 1 0 1 0 1.4 1.4L12 13.4l4.9 4.9a1 1 0 0 0 1.4-1.4L13.4 12l4.9-4.9a1 1 0 0 0 0-1.4Z" />
            </svg>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
            <div className="relative bg-slate-900">
              {producto.imagen_url ? (
                <img
                  src={producto.imagen_url}
                  alt={producto.nombre}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full min-h-[320px] flex items-center justify-center bg-slate-200">
                  <span className="text-sm text-slate-600">Imagen no disponible</span>
                </div>
              )}
            </div>
            <div className="p-8 bg-white">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-500 mb-4">Detalle del producto</p>
              <h2 className="text-3xl font-playfair font-semibold text-slate-900 mb-4">
                {producto.nombre}
              </h2>
              <p className="text-lg font-semibold text-amber-700 mb-5">
                {formatPrecio(producto.precio)}
              </p>
              {producto.descripcion ? (
                <p className="text-sm leading-7 text-slate-700 mb-6">
                  {producto.descripcion}
                </p>
              ) : (
                <p className="text-sm leading-7 text-slate-500 mb-6">
                  Este producto no tiene descripción, pero está listo para tu pedido.
                </p>
              )}
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 px-4 py-2 text-sm font-semibold">
                  Ver más detalles
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

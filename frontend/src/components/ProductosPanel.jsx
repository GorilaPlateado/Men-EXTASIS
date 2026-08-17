import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductoModal from './ProductoModal'

function formatPrecio(precio) {
  return `${Number(precio).toLocaleString('es-ES', { minimumFractionDigits: 0 })} CUP`
}

export default function ProductosPanel({ categoria }) {
  if (!categoria) return null

  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const productos = (categoria.productos || []).filter(p => p.activo !== false)

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={categoria.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative sm:absolute sm:top-0 sm:bottom-0 sm:left-64 sm:right-0 flex-1 min-w-0 flex flex-col py-4 sm:py-6 px-4 sm:px-5 overflow-y-auto pointer-events-auto"
          style={{
            background: 'rgba(10, 5, 3, 0.72)',
            backdropFilter: 'blur(14px)',
          }}
        >
          {/* Título categoría */}
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-2xl text-amber-300 mb-5 font-semibold"
          >
            {categoria.nombre}
          </motion.h3>

          {/* Grid de productos */}
          {productos.length === 0 ? (
            <p className="text-gray-400 text-sm font-inter">Sin productos disponibles.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {productos.map((producto, i) => (
                <motion.button
                  key={producto.id}
                  type="button"
                  onClick={() => setProductoSeleccionado(producto)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white/95 rounded-xl overflow-hidden shadow-xl shadow-black/40 flex flex-col text-left cursor-pointer group"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* Imagen */}
                  <div className="aspect-square w-full overflow-hidden bg-amber-50">
                    {producto.imagen_url ? (
                      <img
                        src={producto.imagen_url}
                        alt={producto.nombre}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-amber-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-2 flex flex-col gap-1">
                    <h4 className="font-inter text-xs font-semibold text-gray-800 leading-tight line-clamp-2">
                      {producto.nombre}
                    </h4>
                    <span className="inline-block bg-amber-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-md w-fit" style={{ fontSize: '0.65rem' }}>
                      {formatPrecio(producto.precio)}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Modal de detalle */}
      <ProductoModal
        producto={productoSeleccionado}
        onClose={() => setProductoSeleccionado(null)}
      />
    </>
  )
}

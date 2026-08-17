import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductoModal from './ProductoModal'
import FlipCard from './FlipCard'

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
                <motion.div
                  key={producto.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="cursor-pointer"
                >
                  <FlipCard
                    className="aspect-[3/4] w-full"
                    front={(
                      <div className="relative w-full h-full rounded-xl overflow-hidden shadow-xl shadow-black/40">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-100">
                          {producto.imagen_url ? (
                            <img
                              src={producto.imagen_url}
                              alt={producto.nombre}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/85 via-black/50 to-transparent">
                          <h4 className="font-inter text-xs font-semibold text-white leading-tight line-clamp-2">
                            {producto.nombre}
                          </h4>
                        </div>
                        <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
                          style={{ border: '1px solid rgba(212,175,55,0.4)' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a4 4 0 011 7.916M9 16l3 3m0 0l3-3" />
                          </svg>
                        </div>
                      </div>
                    )}
                    back={(
                      <div
                        className="relative w-full h-full rounded-xl overflow-hidden flex flex-col justify-between p-3 shadow-xl shadow-black/40"
                        style={{ background: 'linear-gradient(160deg, #8B3A1A 0%, #7a3216 55%, #2d1206 100%)', border: '1px solid rgba(212,175,55,0.35)' }}
                      >
                        <div>
                          <p className="font-playfair text-white text-sm font-semibold leading-snug line-clamp-3">
                            {producto.nombre}
                          </p>
                          <p className="text-amber-200/80 text-[11px] leading-relaxed line-clamp-4 mt-1.5 font-inter">
                            {producto.descripcion || 'Producto seleccionable — toca Ver detalles para más información.'}
                          </p>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-amber-300 font-bold text-sm font-inter whitespace-nowrap">
                            {formatPrecio(producto.precio)}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setProductoSeleccionado(producto) }}
                            className="flex items-center gap-1 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors duration-200"
                          >
                            Ver detalles
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Modal de detalle */}
      <ProductoModal
        producto={productoSeleccionado}
        open={!!productoSeleccionado}
        onClose={() => setProductoSeleccionado(null)}
      />
    </>
  )
}

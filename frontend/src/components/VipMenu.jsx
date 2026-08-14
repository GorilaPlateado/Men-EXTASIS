import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { useApiUrl } from '../hooks/useApiUrl'
import VipCarousel from './VipCarousel'
import ProductoModal from './ProductoModal'

export default function VipMenu() {
  const apiUrl = useApiUrl()
  const [categoriaActiva, setCategoriaActiva] = useState(null)
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)

  const { data: categorias = [], isLoading, isError } = useQuery({
    queryKey: ['categorias-vip'],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/vip/categorias/menu_completo/`)
      if (!res.ok) throw new Error('Error al cargar el menú VIP')
      return res.json()
    },
    staleTime: 1000 * 60 * 5,
    // Seleccionar primera categoría automáticamente
    select: (data) => {
      if (data.length > 0 && !categoriaActiva) {
        // Se hace en el efecto de abajo para no violar reglas de hooks
      }
      return data
    },
  })

  // Seleccionar primera categoría cuando cargan los datos
  const categoriaActivaFinal = categoriaActiva ?? categorias[0] ?? null
  const productosActivos = (categoriaActivaFinal?.productos || []).filter(p => p.activo !== false)

  return (
    <>
      <section
        className="relative w-full min-h-screen"
        style={{ background: 'linear-gradient(160deg, #1a0a04 0%, #2d1206 50%, #1a0804 100%)' }}
      >
        {/* Línea dorada superior */}
        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37 40%, #D4AF37 60%, transparent)' }} />

        <div className="container mx-auto px-4 py-20">

          {/* Encabezado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
              style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.4)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="font-inter text-xs font-semibold tracking-widest uppercase text-amber-400">Menú VIP</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h2 className="font-script text-5xl md:text-6xl mb-3" style={{ color: '#D4AF37' }}>
              Experiencia Premium
            </h2>
            <p className="font-inter text-gray-400 text-sm tracking-wide max-w-md mx-auto">
              Una carta diseñada para quienes buscan algo más que una buena comida
            </p>
          </motion.div>

          {/* Estados de carga / error / vacío */}
          {isLoading ? (
            <div className="flex justify-center py-24">
              <div className="w-10 h-10 rounded-full border-2 border-amber-600/40 border-t-amber-500 animate-spin" />
            </div>
          ) : isError ? (
            <p className="text-center font-inter text-sm py-12" style={{ color: 'rgba(255,100,100,0.7)' }}>
              No se pudo cargar el menú VIP. Verifica que el servidor esté activo.
            </p>
          ) : categorias.length === 0 ? (
            <p className="text-center text-gray-500 font-inter text-sm py-12">
              No hay categorías VIP disponibles aún.
            </p>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col lg:flex-row gap-8 items-start justify-center"
            >
              {/* Panel categorías */}
              <div className="w-full lg:w-56 flex-shrink-0">
                <p className="font-inter text-xs uppercase tracking-widest mb-3"
                  style={{ color: 'rgba(212,175,55,0.6)' }}>
                  Categorías
                </p>
                <ul className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
                  {categorias.map((cat, i) => {
                    const isActive = categoriaActivaFinal?.id === cat.id
                    return (
                      <motion.li key={cat.id}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.06 }}
                        className="flex-shrink-0"
                      >
                        <button
                          onClick={() => setCategoriaActiva(cat)}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl w-full transition-all duration-200"
                          style={{
                            background: isActive
                              ? 'linear-gradient(135deg, rgba(139,58,26,0.9), rgba(192,74,26,0.8))'
                              : 'rgba(255,255,255,0.05)',
                            border: isActive
                              ? '1px solid rgba(212,175,55,0.5)'
                              : '1px solid rgba(255,255,255,0.08)',
                            boxShadow: isActive ? '0 4px 20px rgba(139,58,26,0.4)' : 'none',
                          }}
                        >
                          <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border-2"
                            style={{ borderColor: isActive ? '#D4AF37' : 'rgba(255,255,255,0.15)' }}>
                            {cat.imagen_url ? (
                              <img src={cat.imagen_url} alt={cat.nombre} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center font-playfair text-white text-sm"
                                style={{ background: 'linear-gradient(135deg, #6b2810, #9e3d1a)' }}>
                                {cat.nombre.charAt(0)}
                              </div>
                            )}
                          </div>
                          <span className="font-inter text-sm font-medium text-left"
                            style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.6)' }}>
                            {cat.nombre}
                          </span>
                          {isActive && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 ml-auto text-amber-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          )}
                        </button>
                      </motion.li>
                    )
                  })}
                </ul>
              </div>

              {/* Carrusel */}
              <div className="flex-1 min-w-0">
                <div className="relative rounded-3xl overflow-hidden px-8 pt-10 pb-0"
                  style={{ background: '#F5EFE6' }}>

                  <AnimatePresence mode="wait">
                    <motion.p
                      key={categoriaActivaFinal?.id}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="font-playfair text-center text-lg font-semibold mb-6"
                      style={{ color: '#5a2d0c' }}
                    >
                      {categoriaActivaFinal?.nombre}
                    </motion.p>
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={categoriaActivaFinal?.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <VipCarousel
                        productos={productosActivos}
                        onProductClick={setProductoSeleccionado}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Franja terracota inferior */}
                  <div className="mt-8 -mx-8 h-14" style={{
                    background: 'linear-gradient(135deg, #C04A1A 0%, #8B3A1A 60%, #7a3216 100%)',
                    borderRadius: '0 0 24px 24px',
                    clipPath: 'ellipse(110% 100% at 50% 100%)',
                  }} />
                </div>
              </div>

            </motion.div>
          )}
        </div>

        {/* Línea dorada inferior */}
        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37 40%, #D4AF37 60%, transparent)' }} />
      </section>

      {/* Modal detalle producto */}
      <ProductoModal
        producto={productoSeleccionado}
        onClose={() => setProductoSeleccionado(null)}
      />
    </>
  )
}

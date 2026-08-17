import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { useApiUrl } from '../hooks/useApiUrl'
import MenuPanel from './MenuPanel'
import ProductosPanel from './ProductosPanel'
import ProductModal from './ProductModal'

export default function Hero() {
  const apiUrl = useApiUrl()
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [categoriaActiva, setCategoriaActiva] = useState(null)

  const { data: categorias = [] } = useQuery({
    queryKey: ['categorias'],
    queryFn: () =>
      fetch(`${apiUrl}/categorias/menu_completo/`).then(res => {
        if (!res.ok) throw new Error('Error al cargar el menú')
        return res.json()
      }),
    staleTime: 1000 * 60 * 5,
  })

  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const [modalAbierto, setModalAbierto] = useState(false)

  const handleToggleMenu = () => {
    if (menuAbierto) {
      setMenuAbierto(false)
      setCategoriaActiva(null)
    } else {
      setMenuAbierto(true)
      if (categorias.length > 0) {
        setCategoriaActiva(prev => prev ?? categorias[0])
      }
    }
  }

  const handleOpenModal = (producto) => {
    setProductoSeleccionado(producto)
    setModalAbierto(true)
  }

  const handleCloseModal = () => {
    setModalAbierto(false)
    setProductoSeleccionado(null)
  }

  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* Fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')", backgroundColor: '#1a0804' }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,4,2,0.65) 0%, rgba(20,8,4,0.55) 100%)' }} />

      {/* Título central */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 pointer-events-none">

        {/* Línea + nombre script + línea — igual que la referencia */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="block h-px w-12 md:w-20" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
          <span
            className="font-script text-5xl md:text-6xl lg:text-7xl"
            style={{ color: '#D4AF37', textShadow: '0 2px 20px rgba(212,175,55,0.4)' }}
          >
            Restaurante
          </span>
          <span className="block h-px w-12 md:w-20" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
        </motion.div>

        {/* Nombre principal bold serif */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="font-script leading-none mb-5"
          style={{
            fontSize: 'clamp(3.5rem, 10vw, 7rem)',
            color: '#E8A030',
            textShadow: '0 4px 32px rgba(0,0,0,0.8)',
            letterSpacing: '-0.01em',
          }}
        >
          Éxtasis
        </motion.h1>

        {/* Subtítulo fino */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="font-inter font-light text-white/90 tracking-widest uppercase mb-2"
          style={{ fontSize: 'clamp(0.7rem, 1.8vw, 1rem)', letterSpacing: '0.18em', textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
        >
          Sabores cubanos para paladares exigentes
        </motion.p>
      </div>

      {/* Botón Ver Menú — z-50 garantiza que siempre está por encima */}
      <motion.button
        onClick={handleToggleMenu}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className={`absolute top-6 left-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl font-inter text-sm font-semibold transition-all duration-300 shadow-lg cursor-pointer ${
          menuAbierto
            ? 'bg-amber-600 text-white shadow-amber-900/50'
            : 'bg-white/15 backdrop-blur-md border border-white/25 text-white hover:bg-white/25 hover:border-amber-300/50'
        }`}
      >
        <span className="w-5 h-5 flex flex-col justify-center items-center gap-1">
          <motion.span animate={menuAbierto ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} className="block w-4 h-0.5 bg-current rounded-full origin-center" />
          <motion.span animate={menuAbierto ? { opacity: 0 } : { opacity: 1 }} className="block w-4 h-0.5 bg-current rounded-full" />
          <motion.span animate={menuAbierto ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} className="block w-4 h-0.5 bg-current rounded-full origin-center" />
        </span>
        {menuAbierto ? 'Cerrar' : 'Ver Menú'}
      </motion.button>

      {/* Overlay cierre (z-30) + Paneles (z-40) */}
      <AnimatePresence>
        {menuAbierto && (
          <>
            {/* Overlay semitransparente para cerrar al clicar fuera */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleToggleMenu}
              className="absolute inset-0 z-30"
            />

            {/* Panel categorías */}
            <div key="panels" className="absolute inset-0 z-40 pointer-events-none flex flex-col sm:block">
              <MenuPanel
                categorias={categorias}
                categoriaActiva={categoriaActiva}
                onSelect={setCategoriaActiva}
                isOpen={menuAbierto}
              />
              {categoriaActiva && (
                <ProductosPanel categoria={categoriaActiva} onProductClick={handleOpenModal} />
              )}
              <ProductModal producto={productoSeleccionado} open={modalAbierto} onClose={handleCloseModal} />
            </div>
          </>
        )}
      </AnimatePresence>

    </section>
  )
}

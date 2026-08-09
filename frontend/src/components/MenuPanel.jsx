import { motion, AnimatePresence } from 'framer-motion'

export default function MenuPanel({ categorias, categoriaActiva, onSelect, isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: -320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -320, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="absolute top-0 left-0 h-full w-64 z-30 flex flex-col py-6 px-3 pointer-events-auto"
          style={{ background: 'rgba(15, 8, 5, 0.45)', backdropFilter: 'blur(6px)' }}
        >
          {/* Header del panel */}
          <div className="mb-5 px-2">
            <p className="text-xs uppercase tracking-widest text-amber-300/70 font-inter">Nuestro Menú</p>
          </div>

          {/* Lista de categorías */}
          <ul className="flex flex-col gap-2 flex-1 overflow-y-auto">
            {categorias.map((cat, i) => {
              const isActive = categoriaActiva?.id === cat.id
              return (
                <motion.li
                  key={cat.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    onClick={() => onSelect(cat)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? 'bg-amber-600/90 shadow-lg shadow-amber-900/40'
                        : 'hover:bg-white/10'
                    }`}
                  >
                    {/* Placeholder circular */}
                    <div className={`w-11 h-11 rounded-full flex-shrink-0 overflow-hidden border-2 transition-all duration-200 ${
                      isActive ? 'border-amber-300' : 'border-white/20 group-hover:border-amber-300/50'
                    }`}>
                      {cat.imagen_url ? (
                        <img src={cat.imagen_url} alt={cat.nombre} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-800/60 to-red-900/60 text-white text-lg font-playfair">
                          {cat.nombre.charAt(0)}
                        </div>
                      )}
                    </div>

                    {/* Nombre categoría */}
                    <span className={`font-inter text-sm font-medium text-left transition-colors duration-200 flex-1 ${
                      isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                    }`}>
                      {cat.nombre}
                    </span>

                    {/* Flecha */}
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 flex-shrink-0 transition-all duration-200 ${
                      isActive ? 'text-white rotate-90' : 'text-gray-500 group-hover:text-gray-300'
                    }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </motion.li>
              )
            })}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

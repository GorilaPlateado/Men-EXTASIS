import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { isAdmin, logout, usuario } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const enVip = location.pathname === '/vip'

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4"
    >
      {/* Izquierda: nombre del usuario */}
      <div className="flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold font-inter"
          style={{ background: 'rgba(212,175,55,0.2)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.3)' }}
        >
          {usuario?.nombre?.charAt(0)?.toUpperCase() || '?'}
        </div>
        <span className="font-inter text-xs text-white/50 hidden sm:block">
          {usuario?.nombre}
        </span>
      </div>

      {/* Derecha: botones */}
      <div className="flex items-center gap-2">

        {/* Botón Menú VIP */}
        <motion.button
          onClick={() => navigate(enVip ? '/' : '/vip')}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 text-sm font-inter font-medium px-4 py-2.5 rounded-full transition-all duration-300"
          style={enVip ? {
            background: 'linear-gradient(135deg, #8B3A1A, #C04A1A)',
            color: '#fff',
            boxShadow: '0 4px 16px rgba(139,58,26,0.5)',
            border: '1px solid rgba(212,175,55,0.4)',
          } : {
            background: 'rgba(212,175,55,0.12)',
            color: '#D4AF37',
            border: '1px solid rgba(212,175,55,0.35)',
          }}
        >
          {/* Estrella VIP */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          {enVip ? 'Volver al menú' : 'Menú VIP'}
        </motion.button>

        {/* Botón Panel Admin (solo administrador) */}
        {isAdmin && (
          <a
            href="http://localhost:8000/admin/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-inter font-medium px-4 py-2.5 rounded-full transition-all duration-300 hover:border-amber-300/60 hover:text-amber-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Panel Admin
          </a>
        )}

        {/* Botón Cerrar sesión */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-white/40 hover:text-red-400 text-xs font-inter px-3 py-2.5 rounded-full transition-all duration-200 hover:bg-red-900/20"
          title="Cerrar sesión"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="hidden sm:block">Salir</span>
        </button>

      </div>
    </motion.nav>
  )
}

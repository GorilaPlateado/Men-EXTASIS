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
      className="absolute top-0 left-0 right-0 z-50 flex justify-end items-center gap-3 px-8 py-4"
    >
      {/* Botón Menú VIP */}
      <button
        onClick={() => navigate(enVip ? '/' : '/vip')}
        className="flex items-center gap-2 backdrop-blur-sm border text-white text-sm font-inter font-medium px-5 py-2.5 rounded-full transition-all duration-300"
        style={{
          background: enVip
            ? 'linear-gradient(135deg, rgba(139,58,26,0.9), rgba(192,74,26,0.8))'
            : 'rgba(255,255,255,0.10)',
          borderColor: enVip ? 'rgba(212,175,55,0.6)' : 'rgba(255,255,255,0.25)',
          boxShadow: enVip ? '0 4px 20px rgba(139,58,26,0.4)' : 'none',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        {enVip ? 'Volver al Menú' : 'Menú VIP'}
      </button>

      {/* Panel Admin — solo administradores */}
      {isAdmin && (
        <a
          href="http://localhost:8000/admin/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-inter font-medium px-5 py-2.5 rounded-full transition-all duration-300 hover:border-amber-300/60 hover:text-amber-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Panel Admin
        </a>
      )}

      {/* Cerrar sesión */}
      <button
        onClick={handleLogout}
        title={`Cerrar sesión (${usuario?.nombre || usuario?.username})`}
        className="flex items-center gap-2 backdrop-blur-sm border border-white/20 text-white/70 hover:text-red-400 hover:border-red-400/50 text-sm font-inter font-medium px-4 py-2.5 rounded-full transition-all duration-300"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Salir
      </button>
    </motion.nav>
  )
}

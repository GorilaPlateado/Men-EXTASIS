import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)
  const [mostrarPass, setMostrarPass] = useState(false)

  // Si ya está autenticado, redirigir al menú
  if (isAuthenticated) return <Navigate to="/" replace />

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.username.trim() || !form.password.trim()) {
      setError('Por favor completa todos los campos.')
      return
    }
    setCargando(true)
    setError('')
    try {
      await login(form.username.trim(), form.password)
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #0f0503 0%, #1a0804 60%, #0c0302 100%)' }}
    >
      {/* Partículas decorativas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #D4AF37, transparent)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #8B3A1A, transparent)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative w-full max-w-md"
      >
        {/* Tarjeta principal */}
        <div
          className="rounded-3xl px-8 py-10 shadow-2xl"
          style={{
            background: 'rgba(20, 8, 4, 0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(212,175,55,0.2)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(212,175,55,0.1)',
          }}
        >
          {/* Logo / Nombre */}
          <div className="text-center mb-8">
            {/* Línea decorativa */}
            <div className="flex items-center gap-3 justify-center mb-4">
              <span className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="h-px flex-1" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
            </div>

            <h1
              className="font-script text-4xl mb-1"
              style={{ color: '#D4AF37', textShadow: '0 2px 20px rgba(212,175,55,0.3)' }}
            >
              Éxtasis
            </h1>
            <p className="font-inter text-xs tracking-widest uppercase"
              style={{ color: 'rgba(212,175,55,0.5)' }}>
              Restaurante — Acceso al sistema
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

            {/* Campo usuario */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="username" className="font-inter text-xs font-medium tracking-wide"
                style={{ color: 'rgba(255,255,255,0.5)' }}>
                Usuario
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}
                    style={{ color: 'rgba(212,175,55,0.5)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Tu nombre de usuario"
                  className="w-full pl-10 pr-4 py-3 rounded-xl font-inter text-sm text-white placeholder-gray-600 outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  onFocus={e => e.target.style.border = '1px solid rgba(212,175,55,0.5)'}
                  onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.1)'}
                />
              </div>
            </div>

            {/* Campo contraseña */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="font-inter text-xs font-medium tracking-wide"
                style={{ color: 'rgba(255,255,255,0.5)' }}>
                Contraseña
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}
                    style={{ color: 'rgba(212,175,55,0.5)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  id="password"
                  name="password"
                  type={mostrarPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Tu contraseña"
                  className="w-full pl-10 pr-11 py-3 rounded-xl font-inter text-sm text-white placeholder-gray-600 outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  onFocus={e => e.target.style.border = '1px solid rgba(212,175,55,0.5)'}
                  onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.1)'}
                />
                {/* Toggle mostrar contraseña */}
                <button
                  type="button"
                  onClick={() => setMostrarPass(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-opacity duration-200 hover:opacity-80"
                  aria-label={mostrarPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {mostrarPass ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}
                      style={{ color: 'rgba(212,175,55,0.5)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}
                      style={{ color: 'rgba(212,175,55,0.5)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Mensaje de error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl"
                  style={{ background: 'rgba(139,0,0,0.3)', border: '1px solid rgba(220,38,38,0.4)' }}
                  role="alert"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-400 flex-shrink-0" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="font-inter text-sm text-red-300">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Botón de acceso */}
            <motion.button
              type="submit"
              disabled={cargando}
              whileHover={{ scale: cargando ? 1 : 1.02 }}
              whileTap={{ scale: cargando ? 1 : 0.98 }}
              className="w-full py-3.5 rounded-xl font-inter text-sm font-semibold text-white transition-all duration-200 mt-1 flex items-center justify-center gap-2"
              style={{
                background: cargando
                  ? 'rgba(139,58,26,0.5)'
                  : 'linear-gradient(135deg, #8B3A1A, #C04A1A)',
                boxShadow: cargando ? 'none' : '0 4px 20px rgba(139,58,26,0.5)',
                cursor: cargando ? 'not-allowed' : 'pointer',
              }}
            >
              {cargando ? (
                <>
                  <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Verificando...
                </>
              ) : (
                <>
                  Iniciar sesión
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </motion.button>
          </form>

          {/* Footer de la tarjeta */}
          <div className="mt-8 pt-6 flex justify-center"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="font-inter text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Restaurante Éxtasis © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

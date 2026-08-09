/**
 * RutaProtegida — redirige a /login si no hay sesión activa.
 */
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RutaProtegida({ children }) {
  const { isAuthenticated, cargando } = useAuth()

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #0f0503 0%, #1a0804 100%)' }}>
        <div className="w-10 h-10 rounded-full border-2 border-amber-600/40 border-t-amber-500 animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

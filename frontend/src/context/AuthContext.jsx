/**
 * AuthContext — gestiona el estado de autenticación global.
 * Almacena el token JWT en localStorage y expone:
 *   - usuario: { id, username, nombre, rol }
 *   - login(username, password) → Promise
 *   - logout()
 *   - isAdmin, isCamarera
 */
import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true) // para no flashear login en el primer render

  // Al montar, restaurar sesión desde localStorage
  useEffect(() => {
    const initialize = async () => {
      const token = localStorage.getItem('access_token')
      if (!token) {
        setCargando(false)
        return
      }

      try {
        const res = await fetch(`${API_URL}/auth/me/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (!res.ok) {
          throw new Error('Sesión inválida')
        }

        const data = await res.json()
        localStorage.setItem('usuario', JSON.stringify(data))
        setUsuario(data)
      } catch {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('usuario')
        setUsuario(null)
      } finally {
        setCargando(false)
      }
    }

    initialize()
  }, [])

  const login = useCallback(async (username, password) => {
    const res = await fetch(`${API_URL}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err?.detail || 'Usuario o contraseña incorrectos')
    }

    const data = await res.json()
    localStorage.setItem('access_token', data.access)
    localStorage.setItem('refresh_token', data.refresh)
    localStorage.setItem('usuario', JSON.stringify(data.usuario))
    setUsuario(data.usuario)
    return data.usuario
  }, [])

  const logout = useCallback(async () => {
    const refresh = localStorage.getItem('refresh_token')
    const access = localStorage.getItem('access_token')
    // Invalidar token en el servidor (best-effort)
    if (refresh && access) {
      fetch(`${API_URL}/auth/logout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({ refresh }),
      }).catch(() => {})
    }
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('usuario')
    setUsuario(null)
  }, [])

  const value = {
    usuario,
    cargando,
    login,
    logout,
    isAdmin: usuario?.rol === 'administrador',
    isCamarera: usuario?.rol === 'camarera',
    isAuthenticated: !!usuario,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}

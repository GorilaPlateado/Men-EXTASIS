import { useMemo } from 'react'

/**
 * Hook que devuelve la URL base de la API.
 * Usa VITE_API_URL o fallback a http://localhost:8000/api
 */
export function useApiUrl() {
  return useMemo(() => {
    const envUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
    return envUrl.replace(/\/+$/, '')
  }, [])
}

/**
 * Hook para construir URLs completas de recursos (imágenes, etc.)
 */
export function useMediaUrl() {
  return useMemo(() => {
    const envUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
    return envUrl.replace(/\/+$/, '')
  }, [])
}

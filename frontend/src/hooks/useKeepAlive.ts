import { useEffect } from 'react'

const PING_INTERVAL_MS = 2 * 60 * 1000 // 2 minutos
const API_URL = import.meta.env.VITE_API_URL || '/api'

export const useKeepAlive = () => {
  useEffect(() => {
    const ping = () => fetch(`${API_URL}/health`).catch(() => {})

    ping()
    const interval = setInterval(ping, PING_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [])
}

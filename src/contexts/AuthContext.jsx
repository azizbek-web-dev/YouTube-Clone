import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY = 'yt-clone-user'

const colors = ['#ff4d4d', '#4da6ff', '#43a047', '#ff9800', '#9c27b0', '#0d6efd']

function pickColor(name) {
  const idx = name.charCodeAt(0) % colors.length
  return colors[idx]
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [user])

  const login = ({ email, password }) => {
    if (!email || !email.includes('@')) {
      throw new Error("To'g'ri email kiriting")
    }
    if (!password || password.length < 6) {
      throw new Error("Parol kamida 6 belgi bo'lishi kerak")
    }
    const name = email.split('@')[0]
    setUser({
      email,
      name,
      handle: `@${name.toLowerCase()}`,
      color: pickColor(name),
    })
  }

  const register = ({ name, email, password }) => {
    if (!name || name.trim().length < 2) {
      throw new Error("Ism kamida 2 belgi bo'lishi kerak")
    }
    if (!email || !email.includes('@')) {
      throw new Error("To'g'ri email kiriting")
    }
    if (!password || password.length < 6) {
      throw new Error("Parol kamida 6 belgi bo'lishi kerak")
    }
    setUser({
      email,
      name: name.trim(),
      handle: `@${name.trim().toLowerCase().replace(/\s+/g, '_')}`,
      color: pickColor(name),
    })
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

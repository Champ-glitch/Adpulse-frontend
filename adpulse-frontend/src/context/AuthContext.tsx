import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { api, User } from '../lib/api'

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  loading: boolean
}

interface RegisterData {
  name: string
  email: string
  phone: string
  password: string
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('adpulse_token')
    const storedUser = localStorage.getItem('adpulse_user')
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password })
    setToken(data.token)
    setUser(data.user)
    localStorage.setItem('adpulse_token', data.token)
    localStorage.setItem('adpulse_user', JSON.stringify(data.user))
  }

  const register = async (registerData: RegisterData) => {
    const { data } = await api.post('/auth/register', registerData)
    setToken(data.token)
    setUser(data.user)
    localStorage.setItem('adpulse_token', data.token)
    localStorage.setItem('adpulse_user', JSON.stringify(data.user))
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('adpulse_token')
    localStorage.removeItem('adpulse_user')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Session } from '@lib/types'

interface AuthContextType {
  session: Session | null
  login: (session: Session) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Try to load user from localStorage (set by API client after login)
    const user = localStorage.getItem('user')
    if (user) {
      try {
        const userData = JSON.parse(user)
        const token = localStorage.getItem('access_token') || ''
        setSession({
          user: {
            id: userData.id,
            email: userData.email,
            name: userData.username,
          },
          token,
        })
      } catch (err) {
        console.error('Failed to parse user from localStorage:', err)
      }
    }
    setIsLoading(false)
  }, [])
  
  const login = (newSession: Session) => {
    setSession(newSession)
    if (newSession.user) {
      localStorage.setItem('user', JSON.stringify(newSession.user))
    }
  }
  
  const logout = () => {
    setSession(null)
    localStorage.removeItem('user')
    localStorage.removeItem('access_token')
  }
  
  if (isLoading) {
    return null
  }
  
  return (
    <AuthContext.Provider value={{ session, login, logout, isAuthenticated: !!session }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

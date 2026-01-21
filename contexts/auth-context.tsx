'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Session } from '@lib/types'
import { getCurrentSession } from '@lib/mock'

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
    const currentSession = getCurrentSession()
    setSession(currentSession)
    setIsLoading(false)
  }, [])
  
  const login = (newSession: Session) => {
    setSession(newSession)
  }
  
  const logout = () => {
    setSession(null)
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

'use client'

import { ReactNode } from 'react'
import { AuthProvider } from '@contexts/auth-context'
import { AppProvider } from '@contexts/app-context'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AppProvider>
        {children}
      </AppProvider>
    </AuthProvider>
  )
}

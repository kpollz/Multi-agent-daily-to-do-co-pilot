'use client'

import { ReactNode } from 'react'
import { useAuth } from '@contexts/auth-context'
import AppLayout from '@components/app-layout'
// import { useRouter } from 'next/navigation'

export default function AppWrapper({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return null
  }
  
  return <AppLayout>{children}</AppLayout>
}

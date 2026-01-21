'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { LogOut, User } from 'lucide-react'
import { useAuth } from '@contexts/auth-context'
import { useRouter } from 'next/navigation'
import Button from '@components/ui/button'

interface AppLayoutProps {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { session, logout } = useAuth()
  const router = useRouter()
  
  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }
  
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center"
              >
                <span className="text-primary font-bold">M</span>
              </motion.div>
              <span className="text-lg font-semibold text-text">MAPE</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-textSecondary">
                <User className="h-4 w-4" />
                <span>{session?.user.name}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/auth-context'
import { AppProvider } from '@/contexts/app-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MAPE - Multi-Agent Personal Executive',
  description: 'Your AI-powered personal executive assistant',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AppProvider>
            {children}
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Input from '@components/ui/input'
import Button from '@components/ui/button'
import { apiClient } from '@/lib/api-client'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    try {
      const response = await apiClient.login(username, password)
      localStorage.setItem('user', JSON.stringify(response.user))
      router.push('/app')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4"
          >
            <Sparkles className="h-8 w-8 text-primary" />
          </motion.div>
          <h1 className="text-3xl font-bold text-text mb-2">Welcome to MAPE</h1>
          <p className="text-textSecondary">Your AI-powered personal executive</p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="bg-surface border border-border rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                label="Username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-danger"
                >
                  {error}
                </motion.p>
              )}
              <Button type="submit" fullWidth loading={isLoading}>
                Sign In
              </Button>
            </form>
          </div>
          
          <p className="text-center text-sm text-textSecondary mt-6">
            Don&apos;t have an account? <a href="/signup" className="text-primary hover:underline">Sign up</a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

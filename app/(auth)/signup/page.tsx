'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Sparkles, ArrowLeft } from 'lucide-react'
import Input from '@/components/ui/input'
import Button from '@/components/ui/button'
import { signup } from '@/lib/mock'
import { useAuth } from '@/contexts/auth-context'
import Link from 'next/link'

export default function SignupPage() {
  const router = useRouter()
  const { login: setSession } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    try {
      const session = await signup({ email, password, name })
      setSession(session)
      router.push('/app')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed')
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
          <h1 className="text-3xl font-bold text-text mb-2">Create Account</h1>
          <p className="text-textSecondary">Join MAPE and transform your productivity</p>
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
                label="Name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                label="Password"
                placeholder="Create a password"
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
                Create Account
              </Button>
            </form>
          </div>
          
          <div className="text-center mt-6">
            <Link
              href="/login"
              className="inline-flex items-center text-sm text-textSecondary hover:text-text transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to sign in
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

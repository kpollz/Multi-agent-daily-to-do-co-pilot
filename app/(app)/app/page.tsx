'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Sparkles, Calendar } from 'lucide-react'
import Textarea from '@components/ui/textarea'
import Button from '@components/ui/button'
import LoadingSpinner from '@components/ui/loading-spinner'
import { getPlan } from '@lib/mock'
import { useApp } from '@contexts/app-context'
// import { Task } from '@lib/types'

export default function IntentionPage() {
  const router = useRouter()
  const { setPhase, setTasks, setSummary } = useApp()
  const [intention, setIntention] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const handlePlanMyDay = async () => {
    if (!intention.trim()) return
    
    setIsLoading(true)
    
    try {
      const response = await getPlan(intention)
      setTasks(response.tasks)
      setSummary(response.summary)
      setPhase('schedule')
      router.push('/app/schedule')
    } catch (error) {
      console.error('Failed to create plan:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6"
        >
          <Calendar className="h-10 w-10 text-primary" />
        </motion.div>
        <h1 className="text-4xl font-bold text-text mb-3">
          What do you want to accomplish tomorrow?
        </h1>
        <p className="text-lg text-textSecondary">
          Describe your goals, tasks, and priorities. Our AI planning team will create an optimized schedule for you.
        </p>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="space-y-6"
      >
        <div className="bg-surface border border-border rounded-lg p-6">
          <Textarea
            label="Your intentions"
            placeholder="For example: I need to finish the quarterly report, have a team meeting at 2pm, go to the gym in the evening, and prepare for tomorrow's client presentation..."
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            rows={8}
            className="text-base"
          />
        </div>
        
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={handlePlanMyDay}
            disabled={!intention.trim() || isLoading}
            className="min-w-[200px]"
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" text="Planning your day..." />
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Plan My Day
              </>
            )}
          </Button>
        </div>
        
        {intention && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-surface/50 border border-border rounded-lg p-4"
          >
            <p className="text-sm text-textSecondary">
              <strong className="text-text">Tip:</strong> Be specific about your priorities and any time constraints for better results.
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

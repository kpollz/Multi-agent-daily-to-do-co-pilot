'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, RotateCcw, ArrowRight, Trophy } from 'lucide-react'
import Button from '@/components/ui/button'
import ExecutionTaskCard from '@/components/execution/execution-task-card'
import { useApp } from '@/contexts/app-context'
import { getClientCurrentTime } from '@/lib/mock'
import { Task } from '@/lib/types'

export default function ExecutionPage() {
  const router = useRouter()
  const { tasks, setTasks, setPhase } = useApp()
  const [currentTime, setCurrentTime] = useState(getClientCurrentTime())
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getClientCurrentTime())
    }, 60000)
    
    return () => clearInterval(interval)
  }, [])
  
  const findActiveTask = (): Task | null => {
    if (tasks.length === 0) return null
    
    for (const task of tasks) {
      if (task.completed) continue
      
      const taskStart = task.startTime.split(':').map(Number)
      const taskEnd = task.endTime.split(':').map(Number)
      
      const currentHours = parseInt(currentTime.split(':')[0])
      const currentMinutes = parseInt(currentTime.split(':')[1])
      
      const currentTimeInMinutes = currentHours * 60 + currentMinutes
      const taskStartInMinutes = taskStart[0] * 60 + taskStart[1]
      const taskEndInMinutes = taskEnd[0] * 60 + taskEnd[1]
      
      if (currentTimeInMinutes >= taskStartInMinutes && currentTimeInMinutes < taskEndInMinutes) {
        return task
      }
    }
    
    return null
  }
  
  const activeTask = findActiveTask()
  const allCompleted = tasks.length > 0 && tasks.every((task) => task.completed)
  const completedCount = tasks.filter((task) => task.completed).length
  
  const handleCompleteTask = (taskId: string) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, completed: true } : task)))
  }
  
  const handleStartNewDay = () => {
    setTasks([])
    setPhase('intention')
    router.push('/app')
  }
  
  const handleBackToSchedule = () => {
    setPhase('schedule')
    router.push('/app/schedule')
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text mb-2">Execution & Tracking</h1>
            <div className="flex items-center space-x-3 text-textSecondary">
              <span className="text-sm">Current time: {currentTime}</span>
              <span className="text-border">|</span>
              <span className="text-sm">
                {completedCount} of {tasks.length} tasks completed
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleBackToSchedule}>
              <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
              Back to Schedule
            </Button>
          </div>
        </div>
        
        <div className="space-y-4 mb-8">
          {tasks.length === 0 ? (
            <div className="bg-surface border border-border rounded-lg p-12 text-center">
              <CheckCircle2 className="h-16 w-16 text-textSecondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-text mb-2">No tasks scheduled</h3>
              <p className="text-textSecondary mb-6">Go back and create your schedule for the day.</p>
              <Button onClick={handleBackToSchedule}>
                Create Schedule
              </Button>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {tasks.map((task, index) => {
                const isActive = activeTask?.id === task.id && !task.completed
                const isCompleted = task.completed
                
                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ExecutionTaskCard
                      task={task}
                      isActive={isActive}
                      isCompleted={isCompleted}
                      onComplete={() => handleCompleteTask(task.id)}
                    />
                  </motion.div>
                )
              })}
            </AnimatePresence>
          )}
        </div>
        
        {allCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-success/10 border border-success/30 rounded-lg p-8 text-center"
          >
            <Trophy className="h-16 w-16 text-success mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-text mb-2">Congratulations! 🎉</h2>
            <p className="text-textSecondary mb-6">
              You've completed all your tasks for today. Great job staying focused and productive!
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Button size="lg" onClick={handleStartNewDay}>
                <RotateCcw className="h-5 w-5 mr-2" />
                Plan Tomorrow
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

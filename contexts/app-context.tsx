'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Task, AppPhase } from '@lib/types'

interface AppContextType {
  phase: AppPhase
  setPhase: (phase: AppPhase) => void
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  updateTask: (taskId: string, updates: Partial<Task>) => void
  summary: string
  setSummary: (summary: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<AppPhase>('intention')
  const [tasks, setTasks] = useState<Task[]>([])
  const [summary, setSummary] = useState('')
  
  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, ...updates } : task))
    )
  }
  
  return (
    <AppContext.Provider
      value={{ phase, setPhase, tasks, setTasks, updateTask, summary, setSummary }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

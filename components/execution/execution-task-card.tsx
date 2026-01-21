'use client'

import { Task } from '@lib/types'
import Card from '@components/ui/card'
import Badge from '@components/ui/badge'
import { Clock, CheckCircle2, Circle } from 'lucide-react'

export interface ExecutionTaskCardProps {
  task: Task
  isActive: boolean
  isCompleted: boolean
  onComplete: () => void
}

export default function ExecutionTaskCard({ task, isActive, isCompleted, onComplete }: ExecutionTaskCardProps) {
  return (
    <Card
      glow={isActive}
      className={`p-5 transition-all duration-300 ${
        isCompleted
          ? 'opacity-50 bg-surface/50'
          : isActive
          ? 'border-primary shadow-lg shadow-primary/20'
          : 'border-border'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          {isCompleted ? (
            <CheckCircle2 className="h-5 w-5 text-success" />
          ) : isActive ? (
            <Circle className="h-5 w-5 text-primary animate-pulse" />
          ) : (
            <Circle className="h-5 w-5 text-textSecondary" />
          )}
          
          <div className="flex items-center space-x-2 text-sm">
            <Clock className={`h-4 w-4 ${isActive ? 'text-primary' : 'text-textSecondary'}`} />
            <span className={`font-medium ${isActive ? 'text-primary' : 'text-textSecondary'}`}>
              {task.startTime} - {task.endTime}
            </span>
          </div>
        </div>
        
        {isActive && <Badge variant="success">Current</Badge>}
        {isCompleted && <Badge variant="default">Completed</Badge>}
      </div>
      
      <h3 className={`text-xl font-semibold mb-2 ${isActive ? 'text-text' : isCompleted ? 'text-textSecondary' : 'text-text'}`}>
        {task.title}
      </h3>
      <p className={`text-sm mb-3 ${isActive ? 'text-textSecondary' : isCompleted ? 'text-textSecondary' : 'text-textSecondary'}`}>
        {task.description}
      </p>
      
      {task.note && (
        <div className="bg-surfaceHover/50 rounded-md p-3 border-l-2 border-border">
          <p className="text-xs text-textSecondary">{task.note}</p>
        </div>
      )}
      
      {isActive && !isCompleted && (
        <button
          onClick={onComplete}
          className="mt-4 w-full py-2.5 bg-primary/10 border border-primary/30 rounded-lg text-primary font-medium hover:bg-primary/20 transition-colors"
        >
          Mark as Complete
        </button>
      )}
    </Card>
  )
}

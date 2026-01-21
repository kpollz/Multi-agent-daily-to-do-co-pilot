'use client'

import { Task } from '@lib/types'
import Card from '@components/ui/card'
import { Clock, Edit3, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'

export interface TaskCardProps {
  task: Task
  isDragging?: boolean
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
}

export default function TaskCard({ task, isDragging, onEdit, onDelete }: TaskCardProps) {
  return (
    <Card
      hover
      className={`p-4 ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2 text-sm text-primary">
          <Clock className="h-4 w-4" />
          <span className="font-medium">
            {task.startTime} - {task.endTime}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 hover:bg-surfaceHover rounded-md transition-colors"
          >
            <Edit3 className="h-4 w-4 text-textSecondary hover:text-text" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 hover:bg-surfaceHover rounded-md transition-colors"
          >
            <Trash2 className="h-4 w-4 text-textSecondary hover:text-danger" />
          </button>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-text mb-1">{task.title}</h3>
      <p className="text-sm text-textSecondary mb-3">{task.description}</p>
      
      {task.note && (
        <div className="bg-surfaceHover rounded-md p-2.5 border-l-2 border-primary">
          <p className="text-xs text-textSecondary">{task.note}</p>
        </div>
      )}
      
      {task.reasonForChange && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 p-2 bg-warning/10 border border-warning/30 rounded-md"
        >
          <p className="text-xs text-warning">
            <strong>Change reason:</strong> {task.reasonForChange}
          </p>
        </motion.div>
      )}
    </Card>
  )
}

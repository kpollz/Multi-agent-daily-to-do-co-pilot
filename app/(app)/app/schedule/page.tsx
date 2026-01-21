'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Plus, ArrowRight, Sparkles } from 'lucide-react'
import Button from '@/components/ui/button'
import TaskCard from '@/components/schedule/task-card'
import TaskEditModal from '@/components/schedule/task-edit-modal'
import TaskCreateModal from '@/components/schedule/task-create-modal'
import { useApp } from '@/contexts/app-context'
import { Task } from '@/lib/types'

function SortableTaskCard({ task, onEdit, onDelete }: { task: Task; onEdit: (task: Task) => void; onDelete: (id: string) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} isDragging={isDragging} onEdit={onEdit} onDelete={onDelete} />
    </div>
  )
}

export default function SchedulePage() {
  const router = useRouter()
  const { tasks, setTasks, summary, setPhase } = useApp()
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    
    if (over && active.id !== over.id) {
      setTasks((prev) => {
        const oldIndex = prev.findIndex((task) => task.id === active.id)
        const newIndex = prev.findIndex((task) => task.id === over.id)
        
        return arrayMove(prev, oldIndex, newIndex)
      })
    }
  }
  
  const handleEditTask = (task: Task) => {
    setEditingTask(task)
  }
  
  const handleSaveTask = (updatedTask: Task) => {
    setTasks((prev) => prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
    setEditingTask(null)
  }
  
  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
  }
  
  const handleCreateTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: String(Date.now()),
    }
    setTasks((prev) => [...prev, task])
  }
  
  const handleConfirmAndExecute = () => {
    setPhase('execution')
    router.push('/app/execution')
  }
  
  const handleBackToIntention = () => {
    setPhase('intention')
    router.push('/app')
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
            <h1 className="text-3xl font-bold text-text mb-2">Review Your Schedule</h1>
            <p className="text-textSecondary">
              Drag tasks to reorder, edit details, or add new tasks as needed.
            </p>
          </div>
          <Button variant="outline" onClick={handleBackToIntention}>
            <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
            Back
          </Button>
        </div>
        
        {summary && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-6"
          >
            <div className="flex items-start space-x-3">
              <Sparkles className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-primary mb-1">AI Summary</p>
                <p className="text-sm text-text">{summary}</p>
              </div>
            </div>
          </motion.div>
        )}
        
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-4 mb-8">
              <AnimatePresence>
                {tasks.map((task) => (
                  <SortableTaskCard
                    key={task.id}
                    task={task}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </AnimatePresence>
            </div>
          </SortableContext>
        </DndContext>
        
        <div className="flex items-center justify-between space-x-4">
          <Button variant="secondary" onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
          
          <Button size="lg" onClick={handleConfirmAndExecute} disabled={tasks.length === 0}>
            Confirm & Execute
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </motion.div>
      
      <TaskEditModal
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        task={editingTask}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
      />
      
      <TaskCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateTask}
      />
    </div>
  )
}

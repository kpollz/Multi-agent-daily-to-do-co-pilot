'use client'

import { useState, useEffect } from 'react'
import { Task } from '@lib/types'
import Modal from '@components/ui/modal'
import Input from '@components/ui/input'
import Textarea from '@components/ui/textarea'
import Button from '@components/ui/button'

export interface TaskEditModalProps {
  isOpen: boolean
  onClose: () => void
  task: Task | null
  onSave: (task: Task) => void
  onDelete?: (taskId: string) => void
}

export default function TaskEditModal({ isOpen, onClose, task, onSave, onDelete }: TaskEditModalProps) {
  const [formData, setFormData] = useState<Partial<Task>>({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    note: '',
  })
  const [reasonForChange, setReasonForChange] = useState('')
  
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        startTime: task.startTime,
        endTime: task.endTime,
        note: task.note || '',
      })
      setReasonForChange(task.reasonForChange || '')
    }
  }, [task])
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!task) return
    
    const updatedTask: Task = {
      ...task,
      title: formData.title || task.title,
      description: formData.description || task.description,
      startTime: formData.startTime || task.startTime,
      endTime: formData.endTime || task.endTime,
      note: formData.note,
      reasonForChange: reasonForChange || undefined,
    }
    
    onSave(updatedTask)
    onClose()
  }
  
  if (!task) return null
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Task">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <Textarea
          label="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="time"
            label="Start Time"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            required
          />
          <Input
            type="time"
            label="End Time"
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            required
          />
        </div>
        <Textarea
          label="Note (Optional)"
          value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          rows={2}
          placeholder="Add any notes for this task..."
        />
        <Textarea
          label="Reason for Change (Optional)"
          value={reasonForChange}
          onChange={(e) => setReasonForChange(e.target.value)}
          rows={2}
          placeholder="Why did you make this change? (This helps the AI learn your preferences)"
        />
        
        <div className="flex space-x-3 pt-2">
          {onDelete && (
            <Button
              type="button"
              variant="danger"
              onClick={() => {
                onDelete(task.id)
                onClose()
              }}
              className="flex-1"
            >
              Delete
            </Button>
          )}
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  )
}

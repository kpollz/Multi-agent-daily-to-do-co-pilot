'use client'

import { useState } from 'react'
import { Task } from '@/lib/types'
import Modal from '@/components/ui/modal'
import Input from '@/components/ui/input'
import Textarea from '@/components/ui/textarea'
import Button from '@/components/ui/button'

export interface TaskCreateModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (task: Omit<Task, 'id'>) => void
}

export default function TaskCreateModal({ isOpen, onClose, onCreate }: TaskCreateModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    note: '',
  })
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    onCreate({
      title: formData.title,
      description: formData.description,
      startTime: formData.startTime,
      endTime: formData.endTime,
      note: formData.note || undefined,
    })
    
    setFormData({
      title: '',
      description: '',
      startTime: '',
      endTime: '',
      note: '',
    })
    onClose()
  }
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Task">
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
        
        <div className="flex space-x-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            Add Task
          </Button>
        </div>
      </form>
    </Modal>
  )
}

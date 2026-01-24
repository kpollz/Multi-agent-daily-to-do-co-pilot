import { forwardRef, TextareaHTMLAttributes } from 'react'
import { motion } from 'framer-motion'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`
    
    // Remove props that conflict with Framer Motion
    const {
      onDrag,
      onDragStart,
      onDragEnd,
      onDragEnter,
      onDragExit,
      onDragLeave,
      onDragOver,
      onAnimationStart,
      onAnimationEnd,
      onAnimationIteration,
      ...htmlProps
    } = props
    
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-textSecondary mb-1.5">
            {label}
          </label>
        )}
        <motion.textarea
          ref={ref}
          id={textareaId}
          className={`w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-text placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none ${error ? 'border-danger' : ''} ${className}`}
          whileFocus={{ scale: 1.01 }}
          {...htmlProps}
        />
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-danger"
          >
            {error}
          </motion.p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export default Textarea

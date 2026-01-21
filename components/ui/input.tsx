import { forwardRef, InputHTMLAttributes } from 'react'
import { motion } from 'framer-motion'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-textSecondary mb-1.5">
            {label}
          </label>
        )}
        <motion.input
          ref={ref}
          id={inputId}
          className={`w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-text placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${error ? 'border-danger' : ''} ${className}`}
          whileFocus={{ scale: 1.01 }}
          {...props}
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

Input.displayName = 'Input'

export default Input

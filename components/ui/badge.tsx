import { HTMLAttributes, forwardRef } from 'react'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger'
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = 'default', className, ...props }, ref) => {
    const variantStyles = {
      default: 'bg-surfaceHover text-text',
      success: 'bg-green-500/20 text-green-400',
      warning: 'bg-yellow-500/20 text-yellow-400',
      danger: 'bg-red-500/20 text-red-400',
    }
    
    return (
      <span
        ref={ref}
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export default Badge

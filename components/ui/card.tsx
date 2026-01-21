import { HTMLAttributes, forwardRef } from 'react'
import { motion } from 'framer-motion'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  glow?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, hover = false, glow = false, className, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={`bg-surface border border-border rounded-lg ${hover ? 'hover:border-primary hover:bg-surfaceHover cursor-pointer transition-colors' : ''} ${glow ? 'animate-glow' : ''} ${className}`}
        whileHover={hover ? { y: -2 } : {}}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

export default Card

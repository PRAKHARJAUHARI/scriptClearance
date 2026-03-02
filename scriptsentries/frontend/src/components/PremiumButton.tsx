// src/components/PremiumButton.tsx
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PremiumButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  icon?: ReactNode
}

export function PremiumButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
}: PremiumButtonProps) {
  const baseClasses =
    variant === 'primary'
      ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
      : 'text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 bg-white'

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative inline-flex items-center justify-center gap-2 font-medium rounded-xl 
                   transition-all duration-300 ${baseClasses} ${sizeClasses[size]} ${className}`}
    >
      {/* Shimmer effect background */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
        style={{
          background:
            variant === 'primary'
              ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
              : 'transparent',
        }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        {children}
      </span>
    </motion.button>
  )
}

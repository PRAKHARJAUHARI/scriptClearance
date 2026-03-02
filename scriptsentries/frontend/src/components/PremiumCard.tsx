// src/components/PremiumCard.tsx
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PremiumCardProps {
  icon: ReactNode
  title: string
  description: string
  color: string
  bgColor: string
  borderColor: string
}

export function PremiumCard({
  icon,
  title,
  description,
  color,
  bgColor,
  borderColor,
}: PremiumCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.3 }}
      className={`relative group rounded-2xl border ${borderColor} ${bgColor} p-6 overflow-hidden backdrop-blur-sm`}
    >
      {/* Animated gradient background on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${color}15, transparent 60%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon with animated background */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`w-12 h-12 rounded-xl ${bgColor} border ${borderColor} 
                       flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow duration-300`}
        >
          {icon}
        </motion.div>

        <h3 className="font-semibold text-slate-800 mb-2 text-sm">{title}</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
      </div>

      {/* Border glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl border opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          borderColor: `${color}40`,
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  )
}

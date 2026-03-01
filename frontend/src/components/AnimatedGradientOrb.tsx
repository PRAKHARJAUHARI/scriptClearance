// src/components/AnimatedGradientOrb.tsx
import { motion } from 'framer-motion'

export function AnimatedGradientOrb() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orb 1 */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-emerald-600/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ top: '-10%', left: '-5%' }}
      />
      
      {/* Gradient orb 2 */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5,
        }}
        style={{ bottom: '-15%', right: '-10%' }}
      />
      
      {/* Gradient orb 3 */}
      <motion.div
        className="absolute w-80 h-80 bg-gradient-to-r from-violet-400/20 to-violet-600/20 rounded-full blur-3xl"
        animate={{
          x: [0, 60, 0],
          y: [0, -80, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 10,
        }}
        style={{ top: '20%', right: '5%' }}
      />
    </div>
  )
}

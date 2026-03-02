// src/components/GradientText.tsx
import { motion } from 'framer-motion'

interface GradientTextProps {
  children: string
  className?: string
  animateOnScroll?: boolean
}

export function GradientText({
  children,
  className = '',
  animateOnScroll = true,
}: GradientTextProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  const words = children.split(' ')

  return (
    <motion.div
      variants={animateOnScroll ? containerVariants : undefined}
      initial={animateOnScroll ? 'hidden' : undefined}
      whileInView={animateOnScroll ? 'visible' : undefined}
      viewport={animateOnScroll ? { once: true, amount: 0.5 } : undefined}
      className={`inline-block ${className}`}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={animateOnScroll ? itemVariants : undefined}
          className="inline-block"
        >
          {word}{' '}
        </motion.span>
      ))}
    </motion.div>
  )
}

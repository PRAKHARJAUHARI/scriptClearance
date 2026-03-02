// src/components/CountUpNumber.tsx
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface CountUpNumberProps {
  to: number
  className?: string
  suffix?: string
  prefix?: string
}

export function CountUpNumber({
  to,
  className = '',
  suffix = '',
  prefix = '',
}: CountUpNumberProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const motionValue = useMotionValue(0)
  const displayValue = useTransform(motionValue, (value) =>
    Math.floor(value).toLocaleString()
  )

  useEffect(() => {
    if (!isInView) return

    const timer = setTimeout(() => {
      motionValue.set(to)
    }, 50)

    return () => clearTimeout(timer)
  }, [isInView, motionValue, to])

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3 }}
    >
      {prefix}
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </motion.span>
  )
}

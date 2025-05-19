import { motion } from 'framer-motion'
import React, { useState } from 'react'

type Props = {
  onComplete?: () => void
}

function CircleScaleOutAnimation({ onComplete }: Props) {
  const [isRevealed, setIsRevealed] = useState(true)

  const handleAnimationComplete = () => {
    onComplete && onComplete()
  }

  return (
    <motion.div
      className='absolute inset-0 bg-[var(--foreground)]'
      initial={{ WebkitMaskImage: 'radial-gradient(circle at center, transparent 0, black 0)' }}
      animate={{
        WebkitMaskImage: isRevealed
          ? 'radial-gradient(circle at center, transparent 100%, black 100%)'
          : 'radial-gradient(circle at center, transparent 0, black 0)'
      }}
      transition={{ duration: 0.65, ease: 'easeInOut', delay: 0.25 }}
      onAnimationComplete={handleAnimationComplete}
    />
  )
}

export default CircleScaleOutAnimation

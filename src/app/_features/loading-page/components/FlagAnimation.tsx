import React, { useEffect, useState } from 'react'
import { motion, useAnimate } from 'framer-motion'
import GoldStar from './GoldStarAnimation'

type Props = {
  onComplete: () => void
}

function FlagAnimation({ onComplete }: Props) {
  const [isStarDisplay, setIsStarDisplay] = useState(false)
  const [isStarAnimationComplete, setIsStarAnimationComplete] = useState(false)
  const [scope, animateControl] = useAnimate()

  // Handle flag animation shape complete
  const handleFlagAnimationShapeComplete = () => {
    setIsStarDisplay(true)
  }

  // Handle star animation complete
  const handleStarAnimationComplete = () => {
    setIsStarAnimationComplete(true)
    setTimeout(() => {
      setIsStarDisplay(false)
    }, 500)
  }

  // Run the last animation
  useEffect(() => {
    if (!isStarAnimationComplete) return

    const runAnimation = async () => {
      const firstPromise = animateControl(
        scope.current,
        {
          scale: [1, 0],
          aspectRatio: ['3/2', '1/1']
        },
        {
          ease: 'easeInOut',
          duration: 0.35,
          delay: 0.35,
          times: [0, 1]
        }
      )

      await Promise.all([firstPromise])
      onComplete()
    }

    runAnimation()
  }, [isStarAnimationComplete])

  return (
    <div className='size-full flex items-center justify-center bg-[var(--foreground)]'>
      <motion.div ref={scope} className='overflow-hidden w-[200px] aspect-3/2 flex items-center flex-col relative'>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            ease: 'easeInOut',
            duration: 0.45
          }}
          className='bg-red-600 w-full h-1/2 origin-left'
        ></motion.div>
        <motion.div
          initial={{
            height: 0
          }}
          animate={{
            height: '50%'
          }}
          transition={{
            ease: 'easeInOut',
            duration: 0.45,
            delay: 0.55
          }}
          onAnimationComplete={handleFlagAnimationShapeComplete}
          className='w-full absolute top-1/2 bg-red-600'
        ></motion.div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            ease: 'easeInOut',
            duration: 0.45
          }}
          className='bg-sky-600 w-full h-1/2 origin-right'
        ></motion.div>

        {isStarDisplay && (
          <div className='absolute size-fit top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <GoldStar isDisplay={isStarDisplay} onComplete={handleStarAnimationComplete} />
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default FlagAnimation

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import GoldStarImage from '@/public/assets/images/gold_star.png'

type Props = {
  isDisplay: boolean
  onComplete: () => void
}

const GoldStar = ({ isDisplay, onComplete }: Props) => {
  const [isVisible, setIsVisible] = useState(isDisplay)
  const [key, setKey] = useState(0)

  // Hiệu ứng bắp rang bơ nổ bung
  const starVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
      y: 30
    },
    visible: {
      scale: [0, 0.5, 1.5, 1],
      opacity: 1,
      y: [5, -10, -5, 0],
      transition: {
        times: [0, 0.3, 0.7, 1],
        duration: 0.7,
        stiffness: 400,
        damping: 10,
        bounce: 0.8
      }
    }
  }

  // Hiệu ứng tia lửa bắn ra
  const sparkVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: { x: number; y: number }) => ({
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: [0, i.x],
      y: [0, i.y],
      transition: {
        duration: 0.5,
        delay: 0.2
      }
    })
  }

  const sparks = [
    { id: 1, x: 50, y: -40 },
    { id: 2, x: -50, y: -40 },
    { id: 3, x: 60, y: 20 },
    { id: 4, x: -60, y: 20 },
    { id: 5, x: 0, y: -60 }
  ]

  return (
    <div className='relative size-fit flex items-center justify-center'>
      {/* Hiệu ứng tia lửa bắn ra */}
      {sparks.map((spark) => (
        <motion.div
          key={`spark-${spark.id}-${key}`}
          className='absolute'
          variants={sparkVariants}
          initial='hidden'
          animate='visible'
          custom={spark}
        >
          <Image src={GoldStarImage} alt='gold star' className='w-[16px]' />
        </motion.div>
      ))}

      {/* Hiệu ứng khói pop */}
      <motion.div
        key={`smoke-${key}`}
        className='absolute rounded-full bg-yellow-100 opacity-50'
        initial={{ scale: 0 }}
        animate={{
          scale: [0, 2.5],
          opacity: [0.5, 0]
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Ngôi sao chính */}
      <motion.div
        key={`star-${key}`}
        variants={starVariants}
        initial='hidden'
        animate='visible'
        className='relative z-10'
        onAnimationComplete={() => {
          onComplete()
        }}
      >
        <Image src={GoldStarImage} alt='gold star' className='w-[60px]' />
      </motion.div>
    </div>
  )
}

export default GoldStar

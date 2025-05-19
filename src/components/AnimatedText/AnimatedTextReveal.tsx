import { motion } from "framer-motion";
import React from "react";

type Props = {
  text: string;
  className?: string;
};

function AnimatedTextReveal({ text, className }: Props) {
  const words = text.split(" ");

  // Container variant để đảm bảo tất cả words đều được animation
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      // transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  // Child variant cho mỗi từ
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 10,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="flex flex-wrap gap-2"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span key={index} className={className} variants={child}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default AnimatedTextReveal;

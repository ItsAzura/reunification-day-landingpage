import { motion } from "framer-motion";
import React from "react";

/**
 * Props cho component AnimatedTextReveal
 * @property text - Nội dung văn bản cần hiển thị
 * @property className - Class CSS tùy chỉnh (optional)
 */
type Props = {
  text: string;
  className?: string;
};

/**
 * AnimatedTextReveal Component
 * Component tạo hiệu ứng reveal cho văn bản với các tính năng:
 * 1. Tách văn bản thành từng từ riêng lẻ
 * 2. Animation cho mỗi từ với hiệu ứng spring
 * 3. Hỗ trợ tùy chỉnh style qua className
 */
function AnimatedTextReveal({ text, className }: Props) {
  // Tách văn bản thành mảng các từ
  const words = text.split(" ");

  // Cấu hình animation cho container
  // Đảm bảo tất cả các từ đều được animation
  const container = {
    hidden: { opacity: 0 },
    visible: () => ({
      opacity: 1,
      // Có thể bật lại stagger effect bằng cách uncomment dòng dưới
      // transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  // Cấu hình animation cho mỗi từ
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
      {/* Render từng từ với animation riêng */}
      {words.map((word, index) => (
        <motion.span key={index} className={className} variants={child}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default AnimatedTextReveal;

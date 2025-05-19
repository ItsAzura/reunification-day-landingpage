import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function AnimatedMouseScrollDown() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render the component on the client side to avoid hydration issues
  if (!mounted) return null;

  return (
    <motion.div className="box-content h-9 w-1 rounded-3xl border-2 border-white px-4 py-2.5 opacity-75">
      <motion.div
        className="h-2.5 w-1 rounded-sm bg-white"
        animate={{
          y: [0, 15, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2.2,
          ease: [0.15, 0.41, 0.69, 0.94],
          repeat: Infinity,
          repeatType: "loop",
        }}
      />
    </motion.div>
  );
}

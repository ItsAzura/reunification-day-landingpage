import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/utils/style";

type Props = {
  text: string;
  className?: string;
};

function AnimatedBasicTextReveal({ text, className }: Props) {
  return (
    <motion.h1
      initial={{
        y: 20,
        opacity: 0,
      }}
      whileInView={{
        y: 0,
        opacity: 1,
      }}
      viewport={{
        margin: "-40%",
        once: true,
      }}
      className={cn("text-[4vw] font-semibold text-black/90", className)}
    >
      {text}
    </motion.h1>
  );
}

export default AnimatedBasicTextReveal;

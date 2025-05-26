import { motion } from "framer-motion";
import React, { useState } from "react";

type Props = {
  onComplete?: () => void;
};

/**
 * CircleScaleOutAnimation Component
 * Creates a circular mask animation that scales out from the center.
 * Used as a transition effect to reveal/hide content.
 */
function CircleScaleOutAnimation({ onComplete }: Props) {
  // State to control the reveal animation
  const [isRevealed, setIsRevealed] = useState(true);

  // Handle animation completion
  const handleAnimationComplete = () => {
    onComplete && onComplete();
  };

  return (
    <motion.div
      className="absolute inset-0 bg-[var(--foreground)]"
      // Initial state: circle mask at center with 0 radius
      initial={{
        WebkitMaskImage:
          "radial-gradient(circle at center, transparent 0, black 0)",
      }}
      // Animate to either fully revealed or hidden state
      animate={{
        WebkitMaskImage: isRevealed
          ? "radial-gradient(circle at center, transparent 100%, black 100%)"
          : "radial-gradient(circle at center, transparent 0, black 0)",
      }}
      // Animation timing and easing
      transition={{ duration: 0.65, ease: "easeInOut", delay: 0.25 }}
      onAnimationComplete={handleAnimationComplete}
    />
  );
}

export default CircleScaleOutAnimation;

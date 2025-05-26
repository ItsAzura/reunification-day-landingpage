import React, { useEffect, useState } from "react";
import { motion, useAnimate } from "framer-motion";
import GoldStar from "./GoldStarAnimation";

type Props = {
  onComplete: () => void;
};

/**
 * FlagAnimation Component
 * Creates an animated flag with a star that appears in the center.
 * The animation sequence:
 * 1. Red stripes animate in
 * 2. Blue section appears
 * 3. Gold star appears and animates
 * 4. Final scale out animation
 */
function FlagAnimation({ onComplete }: Props) {
  // State to control star visibility and animation completion
  const [isStarDisplay, setIsStarDisplay] = useState(false);
  const [isStarAnimationComplete, setIsStarAnimationComplete] = useState(false);
  const [scope, animateControl] = useAnimate();

  // Trigger star display when flag shape is complete
  const handleFlagAnimationShapeComplete = () => {
    setIsStarDisplay(true);
  };

  // Handle star animation completion and cleanup
  const handleStarAnimationComplete = () => {
    setIsStarAnimationComplete(true);
    setTimeout(() => {
      setIsStarDisplay(false);
    }, 500);
  };

  // Final scale out animation when star animation is complete
  useEffect(() => {
    if (!isStarAnimationComplete) return;

    const runAnimation = async () => {
      const firstPromise = animateControl(
        scope.current,
        {
          scale: [1, 0],
          aspectRatio: ["3/2", "1/1"],
        },
        {
          ease: "easeInOut",
          duration: 0.35,
          delay: 0.35,
          times: [0, 1],
        },
      );

      await Promise.all([firstPromise]);
      onComplete();
    };

    runAnimation();
  }, [isStarAnimationComplete]);

  return (
    <div className="flex size-full items-center justify-center bg-[var(--foreground)]">
      {/* Main flag container */}
      <motion.div
        ref={scope}
        className="relative flex aspect-3/2 w-[200px] flex-col items-center overflow-hidden bg-[#121212] shadow-[6px_-5px_47px_-1px_rgba(111,130,12,0.3)]"
      >
        {/* Top red stripe */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 0.25,
          }}
          className="h-1/2 w-full origin-left bg-red-600"
        ></motion.div>

        {/* Middle red stripe */}
        <motion.div
          initial={{
            height: 0,
          }}
          animate={{
            height: "50%",
          }}
          transition={{
            ease: "easeInOut",
            duration: 0.25,
            delay: 0.35,
          }}
          onAnimationComplete={handleFlagAnimationShapeComplete}
          className="absolute top-1/2 w-full bg-red-600"
        ></motion.div>

        {/* Bottom blue section */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 0.25,
          }}
          className="h-1/2 w-full origin-right bg-sky-600"
        ></motion.div>

        {/* Gold star that appears in center */}
        {isStarDisplay && (
          <div className="absolute top-1/2 left-1/2 size-fit -translate-x-1/2 -translate-y-1/2">
            <GoldStar
              isDisplay={isStarDisplay}
              onComplete={handleStarAnimationComplete}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default FlagAnimation;

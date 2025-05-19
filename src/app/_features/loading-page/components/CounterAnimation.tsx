import React, { useEffect, useRef, useState } from "react";
import { useAnimate } from "framer-motion";
import useClientRect from "@/hooks/useClientRect";

type Props = {
  onComplete: () => void;
};

function CounterAnimation({ onComplete }: Props) {
  const firstLetters = ["0", "2", "6", "9"];
  const secondLetters = ["0", "5", "7", "8", " 9"];

  // Initialize refs and client rects for the first letters list
  const firstListRef = useRef<HTMLUListElement>(null);
  const firstListRect = useClientRect(firstListRef);
  const firstListHeight = firstListRect?.height ?? 0;

  // Initialize refs and client rects for the second letters list
  const secondListRef = useRef<HTMLUListElement>(null);
  const secondListRect = useClientRect(secondListRef);
  const secondListHeight = secondListRect?.height ?? 0;

  // Animation controls
  const [scopeFirst, animateFirst] = useAnimate();
  const [scopeSecond, animateSecond] = useAnimate();

  // 1. First animation sequence
  useEffect(() => {
    if (!firstListHeight || !secondListHeight) return;

    const firstKeyframes = firstLetters.map((_, index) => {
      return (firstListHeight / firstLetters.length) * index * -1;
    });

    const secondKeyframes = secondLetters.map((_, index) => {
      return (secondListHeight / secondLetters.length) * index * -1;
    });

    // Counter animation
    const runFirstAnimation = async () => {
      const firstPromise = animateFirst(
        scopeFirst.current,
        { translateY: firstKeyframes },
        {
          duration: 2.65,
          ease: "circOut",
          times: [0, 0.3, 0.6, 0.9],
        },
      );

      const secondPromise = animateSecond(
        scopeSecond.current,
        { translateY: secondKeyframes },
        {
          duration: 2.8,
          ease: "circOut",
          delay: 0.15,
          times: [0, 0.25, 0.5, 0.75, 1],
        },
      );

      // Wait for both animations to complete
      await Promise.all([firstPromise, secondPromise]);
      // End the counter animation
      await Promise.all([
        animateFirst(
          scopeFirst.current,
          { translateY: -firstListHeight },
          { duration: 0.35, ease: "circOut" },
        ),
        animateSecond(
          scopeSecond.current,
          { translateY: -secondListHeight },
          { duration: 0.35, ease: "circOut" },
        ),
      ]);

      // Notify parent that animation is complete
      onComplete && onComplete();
    };

    runFirstAnimation();
  }, [firstListHeight, secondListHeight]);

  return (
    <div className="flex size-full items-center justify-center bg-[var(--foreground)]">
      {/* Counter animation */}
      <div className="relative flex h-[10.5rem] justify-center gap-1 overflow-hidden">
        <div ref={scopeFirst}>
          <ul ref={firstListRef} className="flex h-fit flex-col text-white">
            {firstLetters.map((letter, index) => (
              <li key={index} className="text-[12rem] leading-[0.9] text-white">
                {letter}
              </li>
            ))}
          </ul>
        </div>
        <div ref={scopeSecond}>
          <ul ref={secondListRef} className="flex h-fit flex-col text-white">
            {secondLetters.map((letter, index) => (
              <li key={index} className="text-[12rem] leading-[0.9] text-white">
                {letter}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CounterAnimation;

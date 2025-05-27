import { useState, useRef, useEffect } from "react";
import { useAnimationFrame } from "framer-motion";

// Define the props interface for the Counter component
interface CounterProps {
  isCounting?: boolean;
  // Initial value for the counter
  initialValue?: number;
  // Target value to count towards
  targetValue?: number;
  // Duration of the animation in milliseconds
  duration?: number;
  // Button text when animation is running
  buttonRunningText?: string;
  // Custom font size for the counter value (Tailwind class)
  counterSize?: string;
  // Primary color (Tailwind class name without the prefix)
  primaryColor?: string;
  onComplete?: () => void;
}

export default function Counter({
  isCounting = true,
  initialValue = 2025,
  targetValue = 1975,
  duration = 5000,
  counterSize = "text-7xl",
  primaryColor = "blue",
  onComplete,
}: CounterProps) {
  const [count, setCount] = useState(initialValue);
  const [isAnimating, setIsAnimating] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  // Calculate if we're counting up or down
  const isCountingDown = initialValue > targetValue;

  // Animation configuration
  const animationRef = useRef({
    startTime: 0,
    duration,
    startValue: initialValue,
    endValue: targetValue,
    totalChange: Math.abs(targetValue - initialValue),
  });

  useAnimationFrame((time) => {
    // Only run when animation is active
    if (!isAnimating) return;

    const { startTime, duration, startValue, endValue, totalChange } =
      animationRef.current;

    // Initialize start time
    if (!startTime) {
      animationRef.current.startTime = time;
    }

    // Calculate progress
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function (ease-out-quart)
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);

    // Calculate current value based on counting direction
    const change = totalChange * easeOutQuart;
    const currentValue = isCountingDown
      ? Math.floor(startValue - change)
      : Math.floor(startValue + change);

    setCount(currentValue);

    // End animation
    if (progress >= 1) {
      setCount(endValue);
      setIsAnimating(false);
      onComplete && onComplete();
    }
  });

  useEffect(() => {
    setIsAnimating(isCounting);
  }, [isCounting]);

  return (
    <div
      ref={counterRef}
      className={`${counterSize} font-bold text-${primaryColor} transition-all duration-200`}
      style={{
        fontVariantNumeric: "tabular-nums",
        minWidth: "200px",
        textAlign: "center",
      }}
    >
      {count}
    </div>
  );
}

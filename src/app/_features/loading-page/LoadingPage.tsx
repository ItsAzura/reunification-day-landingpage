import React, { useState } from "react";
import CounterAnimation from "./components/CounterAnimation";
import FlagAnimation from "./components/FlagAnimation";
import CircleScaleOutAnimation from "./components/CircleScaleOutAnimation";
import { useHomePageContext } from "@/app/context";

// Define the possible animation stages
type AnimationStages = "counter" | "flag" | "circleScaleOut";

/**
 * LoadingPage Component
 * This component manages the sequence of loading animations:
 * 1. Counter Animation: Shows counting numbers
 * 2. Flag Animation: Displays a flag with star
 * 3. Circle Scale Out: Final transition animation
 */
function LoadingPage() {
  // State to track current animation stage
  const [currentAnimation, setCurrentAnimation] =
    useState<AnimationStages>("counter");
  const { setShowLoadingPageFn } = useHomePageContext();

  // Handler for when counter animation completes
  const handleCounterComplete = () => {
    // Move to next animation
    setCurrentAnimation("flag");
  };

  // Handler for when flag animation completes
  const handleFlagComplete = () => {
    // Move to next animation
    setCurrentAnimation("circleScaleOut");
  };

  // Handler for when circle scale out animation completes
  const handleCircleScaleOutComplete = () => {
    // Do something when the animation is complete
    setShowLoadingPageFn(false);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-transparent">
      {/* Render appropriate animation based on current stage */}
      {currentAnimation === "counter" && (
        <CounterAnimation onComplete={handleCounterComplete} />
      )}
      {currentAnimation === "flag" && (
        <FlagAnimation onComplete={handleFlagComplete} />
      )}
      {currentAnimation === "circleScaleOut" && (
        <CircleScaleOutAnimation onComplete={handleCircleScaleOutComplete} />
      )}
    </div>
  );
}

export default LoadingPage;

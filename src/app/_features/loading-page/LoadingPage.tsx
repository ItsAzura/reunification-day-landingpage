import React, { useState } from "react";
import CounterAnimation from "./components/CounterAnimation";
import FlagAnimation from "./components/FlagAnimation";
import CircleScaleOutAnimation from "./components/CircleScaleOutAnimation";
import { useHomePageContext } from "@/app/context";

type AnimationStages = "counter" | "flag" | "circleScaleOut";

function LoadingPage() {
  const [currentAnimation, setCurrentAnimation] =
    useState<AnimationStages>("counter");
  const { setShowLoadingPageFn } = useHomePageContext();

  const handleCounterComplete = () => {
    // Move to next animation
    setCurrentAnimation("flag");
  };

  const handleFlagComplete = () => {
    // Move to next animation
    setCurrentAnimation("circleScaleOut");
  };

  const handleCircleScaleOutComplete = () => {
    // Do something when the animation is complete
    setShowLoadingPageFn(false);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-transparent">
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

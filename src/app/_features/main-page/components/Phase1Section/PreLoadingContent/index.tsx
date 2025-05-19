import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimate } from "framer-motion";
import { useAudio } from "@/providers/AudioProvider";
import { SOUND_PATHS } from "@/data/sound-paths";
import ImageCounter from "./ImageCounter";
import Counter from "@/components/Counter";
import TortPaperMask2 from "@/public/assets/images/masks/tort-paper4.webp";
import { VIDEO_PATHS } from "@/data/video-paths";
import AnimatedMouseScrollDown from "@/components/AnimatedMouseScroll";

type Props = {
  onComplete: () => void;
};

function PreLoadingContent({ onComplete }: Props) {
  const [isCounting, setIsCounting] = useState(false);
  const [isCountingComplete, setIsCountingComplete] = useState(false);
  const currentSoundRef = useRef<HTMLAudioElement | null>(null);

  const [scope, animate] = useAnimate();

  const { playForSection } = useAudio();

  // Start counting number and images after 0.8s
  useEffect(() => {
    setTimeout(() => {
      setIsCounting(true);
    }, 800);
  }, []);

  // Play sound when counting
  useEffect(() => {
    if (!currentSoundRef) return;

    if (isCounting) {
      currentSoundRef.current?.pause();

      const audio = new Audio(SOUND_PATHS.CLOCK_TICK_EFFECT_1);
      // audio.loop = true;
      audio.play();
      currentSoundRef.current = audio;
    } else {
      currentSoundRef.current?.pause();
    }

    return () => {
      currentSoundRef.current?.pause();
    };
  }, [isCounting]);

  // Hide counter display when counting is complete
  useEffect(() => {
    if (!isCountingComplete) return;

    animate(scope.current, {
      WebkitMaskSize: "0%",
      maskSize: "0%",
    });

    playForSection("phase-1-section");
  }, [isCountingComplete]);

  // Disable scrolling when counting
  useEffect(() => {
    if (!isCountingComplete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCountingComplete]);

  const handleCompleteNumberCounter = () => {
    setIsCounting(false);
    setIsCountingComplete(true);
    onComplete && onComplete();
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[var(--foreground)]">
      {/* Counter display */}
      <motion.div
        ref={scope}
        className="absolute inset-0 top-0 z-[100] flex items-center justify-center bg-[var(--foreground)]"
        style={{
          WebkitMaskImage: `url(${TortPaperMask2.src})`,
          maskImage: `url(${TortPaperMask2.src})`,
          WebkitMaskSize: "120% 360px",
          maskSize: "120% 360px",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      >
        <div className="flex items-center font-bold">
          <span className="text-[6.5rem] text-white">30/4/</span>
          <Counter
            onComplete={handleCompleteNumberCounter}
            isCounting={isCounting}
            initialValue={2025}
            targetValue={1975}
            duration={9000}
            primaryColor="white"
            counterSize="text-[6.5rem]"
          />
        </div>
      </motion.div>

      {/* Start Page Transition Overlay*/}
      <motion.div
        className="absolute bottom-0 z-[100] w-full bg-white"
        initial={{ height: "100%" }}
        animate={{ height: "0%" }}
        transition={{
          delay: 0.1,
          duration: 0.65,
          ease: "easeInOut",
        }}
      />

      {/* Masked Images Counter overlay */}
      {!isCountingComplete && (
        <div className="absolute inset-0 top-0 z-[99] bg-transparent">
          <ImageCounter isPlaying={isCounting} />
        </div>
      )}

      {/* Video */}
      {isCountingComplete && (
        <div className="absolute inset-0 top-0 z-[99] bg-transparent">
          <video width="100%" height="100%" autoPlay muted loop>
            <source
              src={VIDEO_PATHS.XE_TANG_TIEN_VAO_DINH_DOC_LAP}
              type="video/mp4"
            />
          </video>
        </div>
      )}

      {isCountingComplete && (
        <div className="absolute bottom-10 left-1/2 z-[100] flex -translate-x-1/2 flex-col items-center gap-2 rounded-lg bg-black/80 px-4 py-2 shadow-lg">
          <AnimatedMouseScrollDown />
          <span className="text-sm text-white">Hãy cuộn chuột</span>
        </div>
      )}
    </div>
  );
}

export default PreLoadingContent;

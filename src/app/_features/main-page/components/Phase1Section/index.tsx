import React, { useRef, useState } from "react";
import PreLoadingContent from "./PreLoadingContent";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useAudio } from "@/providers/AudioProvider";
import FirstContent from "./FirstContent";
import { BlurRevealText } from "@/components/AnimatedText/BlurryTextRevealSroll";
import SecondContent from "./SecondContent";

type Contents = "pre-loading" | "first-content";

function Phase1Section() {
  const [currentContent, setCurrentContent] = useState<Contents>("pre-loading");
  const { pauseAudio } = useAudio();

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  // Calculate to animate for preloading content section
  const scale1 = useTransform(scrollYProgress, [0, 0.2], [1, 0.7]);
  const rotate1 = useTransform(scrollYProgress, [0, 0.2], [0, -5]);
  // Calculate to animate for section that runs after preloading content
  const scale2 = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const rotate2 = useTransform(scrollYProgress, [0, 0.2], [5, 0]);

  const handleCompletePreloadingContent = () => {
    setCurrentContent("first-content");
  };

  // Pause the preloading's audio when scroll to the end of the page
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.15) {
      pauseAudio();
    }
  });

  return (
    <section className="size-auto">
      <div ref={containerRef} className="relative h-auto w-full bg-black">
        {/* Preloading content of Phase1Section*/}
        <motion.div
          className="sticky top-0 left-0 h-screen w-full rounded-[10px]"
          style={{ scale: scale1, rotate: rotate1 }}
        >
          <PreLoadingContent onComplete={handleCompletePreloadingContent} />
        </motion.div>
        {/* Main content of Phase1Section */}
        <motion.div
          className="relative z-[100] min-h-screen w-full bg-[var(--foreground)]"
          style={{ scale: scale2, rotate: rotate2 }}
        >
          <FirstContent />
          <SecondContent />
        </motion.div>
      </div>
    </section>
  );
}

export default Phase1Section;

import { useAudio } from "@/providers/AudioProvider";
import { useMotionValueEvent, useScroll } from "framer-motion";
import React, { useRef } from "react";
import HeroContent from "./HeroContent";
import EventEntryContent from "./EventEntryContent";
import EventListPresentation from "./EventListPresentation";
import EndPhase2Content from "./EndPhase2Content";

export default function Phase2Section() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const { playForSection, isPlaying } = useAudio();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isPlaying) return;

    if (latest > 0) {
      playForSection("phase-2-section");
    }
  });

  return (
    <div
      ref={containerRef}
      className="h-auto w-full bg-[var(--color-white-2)]"
      id="phase2-section"
    >
      <HeroContent />
      <EventEntryContent />
      <EventListPresentation />
      <EndPhase2Content />
    </div>
  );
}

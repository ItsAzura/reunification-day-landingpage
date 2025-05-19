import React, { useEffect, useRef, useState } from "react";
import ImageScrollSlider from "./ImageScrollSlider";
import { useScroll } from "framer-motion";
import TextDisplay from "./TextDisplay";

function FirstContent() {
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: contentContainerRef,
    offset: ["start start", "end end"],
  });

  // Calculate the total height of the content container to create sticky scrolling effect
  const windowWidth = window.innerWidth;
  const totalHeight = windowWidth * 0.6 * 3;

  return (
    <div className="relative h-auto w-full bg-[var(--foreground)]">
      <h2 className="w-full text-left text-[4.2rem] text-white">
        SỰ KIỆN 30/4/1975
      </h2>

      <div
        style={{
          height: `${totalHeight}px`,
        }}
        className="relative w-full"
        ref={contentContainerRef}
      >
        <div className="sticky top-0 left-0 flex h-auto w-full bg-transparent">
          <ImageScrollSlider scrollYOfContainerProgress={scrollYProgress} />
          <TextDisplay scrollYOfContainerProgress={scrollYProgress} />
        </div>
      </div>
    </div>
  );
}

export default FirstContent;

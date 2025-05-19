import React, { useRef } from "react";
import Image from "next/image";
import { cn } from "@/utils/style";
import AnimatedBasicTextReveal from "../AnimatedText/AnimatedBasicTextReveal";
import { motion, useScroll, useTransform } from "framer-motion";
import TortPaperImage from "@/public/assets/images/masks/tort-paper-square.png";

type Props = {
  mask?: boolean;
  sectionImageSrc: string;
  sectionContent?: string;
  headerText: string;
  className?: string;
  reverse?: boolean;
  backgroundImageSize?: string;
  renderSectionContent?: () => React.ReactNode;
};

function SectionContent1({
  mask,
  headerText,
  sectionImageSrc,
  sectionContent,
  className,
  reverse = false,
  renderSectionContent,
  backgroundImageSize,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgPositionY = useTransform(scrollYProgress, [0, 1], ["0vh", "-10vh"]);

  return (
    <div ref={containerRef} className="min-h-screen w-full border-t p-10">
      <AnimatedBasicTextReveal text={headerText} className="py-4" />
      <div
        className={cn("flex size-full gap-4", {
          "flex-row-reverse": reverse,
        })}
      >
        <motion.div
          style={{
            backgroundPositionY: bgPositionY,
            backgroundImage: `url(${sectionImageSrc})`,
            backgroundSize: backgroundImageSize || "150% 120%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            borderRadius: "2vh",

            // Mask
            WebkitMaskImage: mask ? `url(${TortPaperImage.src})` : "none",
            maskImage: mask ? `url(${TortPaperImage.src})` : "none",
            WebkitMaskSize: "100%",
            maskSize: "100% 110%",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
          className="min-h-[90vh] w-1/2"
        />
        <div className="w-1/2">
          {sectionContent && <p className="text-[2.8vh] text-black"></p>}
          {renderSectionContent && renderSectionContent()}
        </div>
      </div>
    </div>
  );
}

export default SectionContent1;

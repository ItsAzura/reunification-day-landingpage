import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Su30Object from "./Su30Object";
import VietNamHoaBinhImage from "@/public/assets/images/phase2/vietnamhoabinh.png";
import TortPaperImage from "@/public/assets/images/masks/tort-paper-square.png";
import VietNamFlagImage from "@/public/assets/images/co-viet-nam.webp";

function AnimatedSu30({
  children,
  className,
}: {
  children: React.ReactNode;
  scrollYProgress: MotionValue<number>;
  className: string;
}) {
  return (
    <motion.div
      initial={{
        x: 0,
        y: 0,
      }}
      animate={{
        x: "-120vw",
        y: "-22vh",
      }}
      transition={{
        duration: 1.25,
        ease: "easeInOut",
        repeat: Infinity,
        delay: 2.5,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const bgPositionY = useTransform(scrollYProgress, [0, 1], ["-6vh", "-60vh"]);

  const { scrollYProgress: headerScrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "start end"],
  });

  const headerX = useTransform(
    headerScrollYProgress,
    [0, 1],
    ["0vw", "-100vw"],
  );

  const headerXSmooth = useSpring(headerX, {
    damping: 10,
    stiffness: 100,
    mass: 0.15,
  });

  return (
    <div ref={containerRef} className="relative w-full bg-transparent pt-48">
      {/* Animated Header */}
      <div
        ref={headerRef}
        className="w-full justify-center overflow-x-hidden pt-20"
      >
        <motion.div
          style={{
            x: headerXSmooth,
          }}
          className="flex w-[300%] items-center gap-12"
        >
          <div className="w-fit text-[4vw] font-semibold">
            <span className="text-[var(--color-red-1)]">KỶ NIỆM </span>
            150 NĂM GIẢI PHÓNG ĐẤT NƯỚC
          </div>
          <Image
            src={VietNamFlagImage}
            className="w-[200px]"
            alt="co viet nam"
            width={200}
            height={100}
          />
          <div className="w-fit text-[4vw] font-semibold">
            <span className="text-[var(--color-red-1)]">KỶ NIỆM </span>
            150 NĂM GIẢI PHÓNG ĐẤT NƯỚC
          </div>
          <div className="w-fit text-[4vw] font-semibold">
            <span className="text-[var(--color-red-1)]">KỶ NIỆM </span>
            150 NĂM GIẢI PHÓNG ĐẤT NƯỚC
          </div>
        </motion.div>
      </div>

      <motion.div
        className="relative z-[100] h-[150vh] w-full"
        style={{
          backgroundPositionY: bgPositionY,
          backgroundImage: `url(${VietNamHoaBinhImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center -12vh",
          backgroundRepeat: "no-repeat",
          // Mask
          WebkitMaskImage: `url(${TortPaperImage.src})`,
          maskImage: `url(${TortPaperImage.src})`,
          WebkitMaskSize: "100%",
          maskSize: "100%",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      >
        <AnimatedSu30
          className="absolute right-0 bottom-0"
          scrollYProgress={scrollYProgress}
        >
          <Su30Object />
        </AnimatedSu30>
        <AnimatedSu30
          className="absolute top-[15vh] right-0"
          scrollYProgress={scrollYProgress}
        >
          <Su30Object />
        </AnimatedSu30>
        <AnimatedSu30
          className="absolute top-[70vh] right-0 -translate-y-1/2"
          scrollYProgress={scrollYProgress}
        >
          <Su30Object />
        </AnimatedSu30>
      </motion.div>
    </div>
  );
}

export default HeroContent;

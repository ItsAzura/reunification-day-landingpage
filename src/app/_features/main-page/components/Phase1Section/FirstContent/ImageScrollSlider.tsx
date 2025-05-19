import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import TortPaperImage from "@/public/assets/images/masks/tort-paper-square.png";
import SuKienImage1 from "@/public/assets/images/phase1/first-content/gp_miennam_nocolor.png";
import HoveredSuKienImage1 from "@/public/assets/images/phase1/first-content/gp_miennam_color.png";
import SuKienImage2 from "@/public/assets/images/phase1/first-content/giaiphong-miennam2-nocolor.jpg";
import HoveredSuKienImage2 from "@/public/assets/images/phase1/first-content/giaiphong-miennam2-color.jpg";
import SuKienImage3 from "@/public/assets/images/phase1/first-content/giaiphong-miennam3-nocolor.jpg";
import HoveredSuKienImage3 from "@/public/assets/images/phase1/first-content/giaiphong-miennam3-color.jpg";
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";

const images = [SuKienImage1, SuKienImage2, SuKienImage3];

interface ImageSectionProps {
  data: {
    picture: string;
    hoveredPicture: string;
  };
  mousePosition: {
    x: MotionValue<number>;
    y: MotionValue<number>;
  };
  scrollX: MotionValue<number>;
}

const ImageSection = ({ data, mousePosition, scrollX }: ImageSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { x, y } = mousePosition;

  const adjustedX = useTransform(
    mousePosition.x,
    (v) => v + scrollX.get() * -1,
  );

  return (
    <motion.section
      ref={sectionRef}
      className="block h-screen w-full [clip-path:polygon(0_0,0_100%,100%_100%,100%_0)]"
      style={{
        background: `url(${data.picture})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <motion.div
        className="fixed top-0 left-0 h-[30vw] w-[25vw] overflow-hidden rounded-[10px]"
        style={{ x: adjustedX, y }}
      >
        <img src={data.hoveredPicture} className="w-full object-cover" />
      </motion.div>
    </motion.section>
  );
};

type Props = {
  scrollYOfContainerProgress: MotionValue<number>;
};

export default function ImageScrollSlider({
  scrollYOfContainerProgress,
}: Props) {
  const windowWidth = window.innerWidth;
  const imageContainerWidth = windowWidth * 0.6; // 60% percent of window width
  const x = useTransform(
    scrollYOfContainerProgress,
    [0, 0.95],
    [0, -imageContainerWidth * 2],
  );

  const smoothX = useSpring(x, {
    stiffness: 200,
    damping: 20,
    mass: 0.1,
  });

  // Used for creating split vignette effect
  const springOptions = {
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  };

  const mousePosition = {
    x: useSpring(0, springOptions),
    y: useSpring(0, springOptions),
  };

  const handleMouseMove = (event: any) => {
    const { clientX, clientY } = event;
    const targetX = clientX - (window.innerWidth / 2) * 0.25;
    const targetY = clientY - (window.innerWidth / 2) * 0.3;
    mousePosition.x.set(targetX);
    mousePosition.y.set(targetY);
  };

  const data = [
    { picture: SuKienImage2.src, hoveredPicture: HoveredSuKienImage2.src },
    { picture: SuKienImage1.src, hoveredPicture: HoveredSuKienImage1.src },
    { picture: SuKienImage3.src, hoveredPicture: HoveredSuKienImage3.src },
  ];

  useEffect(() => {
    document.body.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="h-screen w-[60%] overflow-hidden"
      style={{
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
      <motion.div
        style={{ x: smoothX }}
        className="relative flex h-screen w-[300%] items-center"
      >
        {data.map((data, index) => (
          <ImageSection
            key={index}
            data={data}
            mousePosition={mousePosition}
            scrollX={x}
          />
        ))}
      </motion.div>
    </div>
  );
}

import React, { useRef } from "react";
import BacHo1 from "@/public/assets/images/phase3/bacho/Anh-2.webp";
import BacHo2 from "@/public/assets/images/phase3/bacho/Bac-Ho-doc-tuyen-ngon.webp";
import BacHo3 from "@/public/assets/images/phase3/bacho/Bac-Ho-o-chien-dich-bien-gioi.webp";
import BacHo4 from "@/public/assets/images/phase3/bacho/Bac-Ho-o-hang-Pac-Bo.webp";
import BacHo5 from "@/public/assets/images/phase3/bacho/Chan-dung-Bac-Ho.webp";
import BacHo7 from "@/public/assets/images/phase3/bacho/ChatGPT-Image-Apr-10-2025-09_46_20-PM.webp";
import BacHo8 from "@/public/assets/images/phase3/bacho/Chu-tich-Ho-Chi-Minh-lam-viec.webp";
import BacHo9 from "@/public/assets/images/phase3/bacho/Chu-tich-Ho-Chi-Minh-ngoi-thaitrien.webp";
import BacHo10 from "@/public/assets/images/phase3/bacho/Ho-Chi-Minh-1957-thaitrien.webp";
import BacHo11 from "@/public/assets/images/phase3/bacho/Ho-Chi-Minh-1968-thaitrien.webp";
import BacHo12 from "@/public/assets/images/phase3/bacho/Ho-Chi-Minh-chan-dung-1968.webp";
import BacHo13 from "@/public/assets/images/phase3/bacho/Ho-Chi-Minh-thoi-tre-ThaiTrien.webp";
import BacHo14 from "@/public/assets/images/phase3/bacho/Nguyen-Ai-Quoc-tai-hoi-nghi-Vecxay.webp";
import BacHo15 from "@/public/assets/images/phase3/bacho/Nguyen-Ai-Quoc-tai-Paris-Thai-Trien.webp";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import TortPaperSquare from "@/public/assets/images/masks/tort-paper-square.png";

const images = [
  { image: BacHo1, gridPosition: { rowStart: 1, colStart: 1 } },
  { image: BacHo2, gridPosition: { rowStart: 1, colStart: 2 } },
  { image: BacHo3, gridPosition: { rowStart: 1, colStart: 3 } },
  { image: BacHo4, gridPosition: { rowStart: 2, colStart: 1 } },
  { image: BacHo5, gridPosition: { rowStart: 2, colStart: 2 } },
  { image: BacHo7, gridPosition: { rowStart: 2, colStart: 3 } },
  { image: BacHo8, gridPosition: { rowStart: 3, colStart: 1 } },
  { image: BacHo9, gridPosition: { rowStart: 3, colStart: 2 } },
  { image: BacHo10, gridPosition: { rowStart: 3, colStart: 3 } },
  { image: BacHo11, gridPosition: { rowStart: 4, colStart: 1 } },
  { image: BacHo12, gridPosition: { rowStart: 4, colStart: 2 } },
  { image: BacHo13, gridPosition: { rowStart: 4, colStart: 3 } },
  { image: BacHo14, gridPosition: { rowStart: 5, colStart: 1 } },
  { image: BacHo15, gridPosition: { rowStart: 5, colStart: 2 } },
];

function HeroSection({
  children,
  rowStart,
  colStart,
}: {
  children: React.ReactNode;
  rowStart: number;
  colStart: number;
}) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 50%", "end 50%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 100]);

  return (
    <motion.div
      style={{
        opacity,
        position: "relative",
        y,
        gridColumnStart: colStart,
        gridRowStart: rowStart,
      }}
      ref={targetRef}
      className="w-fit hover:brightness-[1.15]"
    >
      {children}
    </motion.div>
  );
}

function HoChiMinhImagesGrid() {
  return (
    <div className="w-full">
      <div className="grid w-full grid-cols-3 grid-rows-5 gap-10 px-10">
        {images.map((image, index) => (
          <HeroSection
            key={index}
            rowStart={image.gridPosition.rowStart}
            colStart={image.gridPosition.colStart}
          >
            <Image
              style={{
                WebkitMaskImage: `url(${TortPaperSquare.src})`,
                maskImage: `url(${TortPaperSquare.src})`,
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))",
              }}
              src={image.image.src}
              alt="anh bac ho chi minh"
              width={300}
              height={300}
              className="size-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
            />
          </HeroSection>
        ))}
      </div>
    </div>
  );
}

export default HoChiMinhImagesGrid;

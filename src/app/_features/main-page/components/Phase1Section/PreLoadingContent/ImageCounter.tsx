import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SuKienImage1 from "@/public/assets/images/phase1/sukien_1.jpg";
import SuKienImage2 from "@/public/assets/images/phase1/sukien_2.webp";
import SuKienImage3 from "@/public/assets/images/phase1/sukien_3.jpg";
import SuKienImage4 from "@/public/assets/images/phase1/sukien_4.jpg";
import SuKienImage5 from "@/public/assets/images/phase1/sukien_5.jpg";
import SuKienImage6 from "@/public/assets/images/phase1/sukien_6.webp";
import SuKienImage7 from "@/public/assets/images/phase1/sukien_7.jpg";
import SuKienImage8 from "@/public/assets/images/phase1/sukien_8.jpg";
import SuKienImage9 from "@/public/assets/images/phase1/sukien_9.webp";
import SuKienImage10 from "@/public/assets/images/phase1/sukien_10.jpg";
import { useAnimationFrame } from "framer-motion";

const imagesData = [
  SuKienImage1,
  SuKienImage2,
  SuKienImage3,
  SuKienImage4,
  SuKienImage5,
  SuKienImage6,
  SuKienImage7,
  SuKienImage8,
  SuKienImage10,
  SuKienImage9,
];

type Props = {
  isPlaying: boolean;
};

function ImageCounter({ isPlaying }: Props) {
  const [isAnimating, setAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const config = useRef({
    startTime: 0,
    duration: 6000,
    startIndex: 0,
    endIndex: imagesData.length - 1,
    totalChange: imagesData.length - 1,
  });

  useAnimationFrame((time) => {
    if (!isAnimating) return;

    if (!config.current.startTime) {
      config.current.startTime = time;
    }

    const { startTime, duration, startIndex, endIndex, totalChange } =
      config.current;

    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function (ease-out-quart)
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);

    // Calculate current value based on counting direction
    const change = totalChange * easeOutQuart;
    const currentValue = Math.floor(startIndex + change);

    setCurrentIndex(currentValue);

    // End animation
    if (progress >= 1) {
      setCurrentIndex(endIndex);
      setAnimating(false);
    }
  });

  useEffect(() => {
    setAnimating(isPlaying);
  }, [isPlaying]);

  return (
    <div
      className="size-full"
      // style={{
      //   backgroundImage: `url(${imagesData[currentIndex].src})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   backgroundRepeat: "no-repeat",
      // }}
    >
      <Image
        src={imagesData[currentIndex]}
        alt="Image"
        priority={true}
        className="size-full object-cover"
      />
    </div>
  );
}

export default ImageCounter;

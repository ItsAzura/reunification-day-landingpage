import React, { useState } from "react";
import Image1 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi1.jpg";
import Image2 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi2.jpg";
import Image3 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi3.jpg";
import Image4 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi4.jpg";
import Image5 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi5.jpg";
import Image6 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi6.jpg";
import Image7 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi7.jpg";
import Image8 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi8.jpg";
import Image9 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi9.jpg";
import Image10 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi10.jpg";
import Image11 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi11.jpg";
import Image12 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi12.jpg";
import Image13 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi13.jpg";
import Image14 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi14.jpg";
import Image15 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi15.jpg";
import Image16 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi16.jpg";
import Image17 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi17.jpg";
import Image18 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi18.jpg";
import Image19 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi19.jpg";
import Image20 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi20.jpg";
import Image21 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi21.jpg";
import Image22 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi22.jpg";
import Image23 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi23.jpg";
import Image24 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi24.jpg";
import Image25 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi25.jpg";
import Image26 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi26.jpg";
import Image27 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi27.jpg";
import Image28 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi28.jpg";
import Image29 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi29.jpg";
import Image30 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi30.jpg";
import Image31 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi31.jpg";
import Image32 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi32.jpg";
import Image33 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi33.jpg";
import Image34 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi34.jpg";
import Image35 from "@/public/assets/images/phase2/dieubinh_dieuhanh/khoi35.jpg";
import Image from "next/image";
import FourthGridWithScroll from "./FourthGridWithScroll";
import { FaXmark } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";

export const images = [
  { image: Image1 },
  { image: Image2 },
  { image: Image3 },
  { image: Image4 },
  { image: Image5 },
  { image: Image6 },
  { image: Image7 },
  { image: Image8 },
  { image: Image9 },
  { image: Image10 },
  { image: Image11 },
  { image: Image12 },
  { image: Image13 },
  { image: Image14 },
  { image: Image15 },
  { image: Image16 },
  { image: Image17 },
  { image: Image18 },
  { image: Image19 },
  { image: Image20 },
  { image: Image21 },
  { image: Image22 },
  { image: Image23 },
  { image: Image24 },
  { image: Image25 },
  { image: Image26 },
  { image: Image27 },
  { image: Image28 },
  { image: Image29 },
  { image: Image30 },
  { image: Image31 },
  { image: Image32 },
  { image: Image33 },
  { image: Image34 },
  { image: Image35 },
  { image: Image35 },
];

function PhotoDisplay() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setActiveImage(image);
  };

  return (
    <div className="relative w-full">
      <FourthGridWithScroll clickImageFn={handleImageClick} />
      <AnimatePresence mode="wait">
        {activeImage && (
          <div className="fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black/70">
            <motion.div
              className="relative"
              initial={{
                opacity: 0,
                scale: 0.6,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0,
                transition: {
                  ease: "easeInOut",
                  duration: 0.25,
                },
              }}
            >
              <Image
                src={activeImage}
                alt="Active Image"
                width={300}
                height={300}
                priority={true}
                className="w-[80vh] object-contain"
              />
              <button
                type="button"
                className="absolute bottom-4 left-1/2 -translate-x-1/2 cursor-pointer rounded-full border-2 p-2 text-white transition-all hover:scale-125"
                onClick={() => setActiveImage(null)}
              >
                <FaXmark />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PhotoDisplay;

import { motion, useScroll, useTransform } from "framer-motion";
import { calculateInitialTransform } from "./utils";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { images } from "./PhotoDisplay";
import Image from "next/image";

// Define interfaces for type safety
interface ViewportSize {
  width: number;
  height: number;
}

interface ElementPosition {
  index: number;
  left: number;
  top: number;
  width: number;
  height: number;
}

interface TransformValues {
  x: number;
  y: number;
  z: number;
  rotateX: number;
  rotateY: number;
}

type Props = {
  clickImageFn: (imageSrc: string) => void;
};

const FourthGridWithScroll = ({ clickImageFn }: Props) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [viewportSize, setViewportSize] = useState<ViewportSize>({
    width: 0,
    height: 0,
  });
  const [elementPositions, setElementPositions] = useState<ElementPosition[]>(
    [],
  );

  // Grid configuration
  const gridColumns: number = 9;
  const gridRows: number = 4;
  const totalImages: number = gridColumns * gridRows;

  // Create an array of indices for our grid items
  const gridItems: number[] = Array.from({ length: totalImages }, (_, i) => i);

  // Sample array of image URLs
  const imageUrls: string[] = images.map((image) => image.image.src);

  // Create refs array directly in the component (no state needed)
  // This ensures refs are created only once and persist across renders
  const elementRefs = gridItems.map(() => useRef<HTMLDivElement>(null));

  // Setup viewport size tracking
  useEffect(() => {
    const updateViewportSize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewportSize();
    window.addEventListener("resize", updateViewportSize);
    return () => window.removeEventListener("resize", updateViewportSize);
  }, []);

  const gridRect = gridRef.current?.getBoundingClientRect();
  // Calculate element positions
  useEffect(() => {
    if (!gridRef.current || viewportSize.width === 0) return;

    // Small timeout to ensure DOM elements are fully rendered and measurable
    const timer = setTimeout(() => {
      const positions: ElementPosition[] = elementRefs
        .map((ref, index) => {
          if (!ref.current || !gridRect) {
            console.warn(`Element ref at index ${index} is null`);
            return null;
          }
          const rect = ref.current.getBoundingClientRect();

          return {
            index,
            left: rect.left,
            top: rect.top - gridRect.top,
            width: rect.width,
            height: rect.height,
          };
        })
        .filter((pos): pos is ElementPosition => pos !== null);

      console.log(
        `Found ${positions.length} valid element positions out of ${elementRefs.length}`,
      );
      setElementPositions(positions);
    }, 200); // Increased timeout for better reliability

    return () => clearTimeout(timer);
  }, [viewportSize]);

  // Setup scroll-based animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const handleClickImage = (index: number) => {
    const image = images[index];
    clickImageFn(image.image.src);
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "300vh",
      }}
      className="relative"
    >
      <motion.div className="bg-green sticky top-0 flex h-[100vh] w-full items-center justify-center">
        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
            gridTemplateRows: `repeat(${gridRows}, 1fr)`,
            perspective: "1000px",
            overflow: "hidden",
          }}
          className="size-full flex-1 gap-2 p-2"
        >
          {gridItems.map((index: number) => {
            let initialTransform: TransformValues = {
              x: 0,
              y: 0,
              z: 0,
              rotateX: 0,
              rotateY: 0,
            };

            if (elementPositions.length > 0 && viewportSize.width > 0) {
              const position = elementPositions.find(
                (pos) => pos.index === index,
              );

              if (position) {
                // Create an ElementInfo object that matches the expected interface
                const elementInfo = {
                  left: position.left,
                  top: position.top,
                  width: position.width,
                  height: position.height,
                };

                initialTransform = calculateInitialTransform(
                  elementInfo,
                  viewportSize,
                );
              }
            }

            const x = useTransform(
              scrollYProgress,
              [0, 1 / 3],
              [initialTransform.x, 0],
            );

            const y = useTransform(
              scrollYProgress,
              [0, 1 / 3],
              [initialTransform.y, 0],
            );

            const z = useTransform(
              scrollYProgress,
              [0, 1 / 3],
              [initialTransform.z, 0],
            );

            const rotateX = useTransform(
              scrollYProgress,
              [0, 1 / 3],
              [initialTransform.rotateX * 0.8, 0],
            );

            const rotateY = useTransform(
              scrollYProgress,
              [0, 1 / 3],
              [initialTransform.rotateY, 0],
            );

            const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
            const scale = useTransform(scrollYProgress, [0, 0.25], [0.7, 1]);

            return (
              <motion.div
                key={index}
                ref={elementRefs[index]}
                style={{
                  x,
                  y,
                  z,
                  rotateX,
                  rotateY,
                  opacity,
                  scale,
                  width: "100%",
                  height: "20vh",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
                className="group relative cursor-pointer border-2 border-transparent hover:border-sky-500"
                onClick={() => handleClickImage(index)}
              >
                <Image
                  src={imageUrls[index % imageUrls.length]} // Added safety with modulo
                  alt={`Grid image ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  width={300}
                  height={300}
                  className="cursor-pointer transition-all duration-300 hover:scale-105"
                />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-white uppercase opacity-0 group-hover:opacity-[1]">
                  NHẤN ĐỂ XEM
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default FourthGridWithScroll;

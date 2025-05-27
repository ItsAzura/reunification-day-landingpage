import { motion, useScroll, useTransform } from "framer-motion";
import { calculateInitialTransform } from "./utils";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { images } from "./PhotoDisplay";
import Image from "next/image";

/**
 * Interface định nghĩa kích thước viewport
 */
interface ViewportSize {
  width: number;
  height: number;
}

/**
 * Interface định nghĩa vị trí của element trong grid
 */
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

/**
 * Props cho component FourthGridWithScroll
 * @property clickImageFn - Hàm xử lý sự kiện click vào ảnh
 */
type Props = {
  clickImageFn: (imageSrc: string) => void;
};

/**
 * FourthGridWithScroll Component
 * Component hiển thị grid ảnh với animation scroll 3D với các tính năng:
 * 1. Grid layout 9x4
 * 2. Animation 3D dựa trên scroll
 * 3. Hiệu ứng transform cho từng ảnh
 * 4. Responsive với kích thước màn hình
 */
const FourthGridWithScroll = ({ clickImageFn }: Props) => {
  // Refs cho container và grid
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // State quản lý kích thước viewport
  const [viewportSize, setViewportSize] = useState<ViewportSize>({
    width: 0,
    height: 0,
  });

  // State quản lý vị trí các element trong grid
  const [elementPositions, setElementPositions] = useState<ElementPosition[]>(
    [],
  );

  // Cấu hình grid
  const gridColumns: number = 9;
  const gridRows: number = 4;
  const totalImages: number = gridColumns * gridRows;

  // Tạo mảng indices cho grid items
  const gridItems: number[] = Array.from({ length: totalImages }, (_, i) => i);

  // Lấy danh sách URL ảnh
  const imageUrls: string[] = images.map((image) => image.image.src);

  // Tạo refs cho từng element trong grid
  const elementRefs = gridItems.map(() => useRef<HTMLDivElement>(null));

  // Theo dõi kích thước viewport
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

  // Tính toán vị trí các element
  useEffect(() => {
    if (!gridRef.current || viewportSize.width === 0) return;

    const timer = setTimeout(() => {
      const positions: ElementPosition[] = elementRefs
        .map((ref, index) => {
          if (!ref.current || !gridRect) return null;
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

      setElementPositions(positions);
    }, 200);

    return () => clearTimeout(timer);
  }, [viewportSize]);

  // Theo dõi scroll để tạo animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Xử lý sự kiện click vào ảnh
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
            // Tính toán transform ban đầu cho mỗi element
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

            // Tính toán các giá trị transform dựa trên scroll
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
                  src={imageUrls[index % imageUrls.length]}
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

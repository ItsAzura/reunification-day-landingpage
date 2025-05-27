import React, { useRef } from "react";
import Image1 from "@/public/assets/images/phase2/dieuhanh_1/anh1.jpg";
import Image2 from "@/public/assets/images/phase2/dieuhanh_1/anh2.jpg";
import Image3 from "@/public/assets/images/phase2/dieuhanh_1/anh3.jpg";
import Image4 from "@/public/assets/images/phase2/dieuhanh_1/anh4.jpg";
import Image5 from "@/public/assets/images/phase2/dieuhanh_1/anh5.jpg";
import Image6 from "@/public/assets/images/phase2/dieuhanh_1/anh6.jpg";
import Image7 from "@/public/assets/images/phase2/dieuhanh_1/anh7.jpg";
import Image8 from "@/public/assets/images/phase2/dieuhanh_1/anh8.jpg";
import Image9 from "@/public/assets/images/phase2/dieuhanh_1/anh9.jpg";
import Image10 from "@/public/assets/images/phase2/dieuhanh_1/anh10.jpg";
import Image11 from "@/public/assets/images/phase2/dieuhanh_1/anh11.jpg";
import Image12 from "@/public/assets/images/phase2/dieuhanh_1/anh12.jpg";
import Image13 from "@/public/assets/images/phase2/dieuhanh_1/anh13.jpg";
import Image14 from "@/public/assets/images/phase2/dieuhanh_1/anh14.jpg";
import Image15 from "@/public/assets/images/phase2/dieuhanh_1/anh15.jpg";
import Image16 from "@/public/assets/images/phase2/dieuhanh_1/anh16.jpg";
import Image17 from "@/public/assets/images/phase2/dieuhanh_1/anh17.jpg";
import { useScroll, motion, useTransform, useSpring } from "framer-motion";

const BASE_Y_POSITION = 100; // View height unit (vh)

const images = [
  {
    id: 1,
    image: Image1,
    gridClass: "col-start-1 row-start-1",
  },
  {
    id: 2,
    image: Image2,
    gridClass: "col-start-3 row-start-1",
  },
  {
    id: 3,
    image: Image3,
    gridClass: "col-start-4 row-start-1",
  },
  {
    id: 4,
    image: Image4,
    gridClass: "col-start-5 row-start-1",
  },
  {
    id: 5,
    image: Image5,
    gridClass: "col-start-7 row-start-1",
  },
  // Row 2
  {
    id: 6,
    image: Image6,
    gridClass: "col-start-1 row-start-2",
  },
  {
    id: 7,
    image: Image8,
    gridClass: "col-start-3 row-start-2",
  },
  {
    id: 8,
    image: Image11,
    gridClass: "col-start-4 row-start-2",
  },
  {
    id: 9,
    image: Image9,
    gridClass: "col-start-6 row-start-2",
  },
  {
    id: 10,
    image: Image10,
    gridClass: "col-start-7 row-start-2",
  },
  {
    id: 11,
    image: Image7,
    gridClass: "col-start-8 row-start-2",
  },
  // Row 3
  {
    id: 12,
    image: Image12,
    gridClass: "col-start-1 row-start-3",
  },
  {
    id: 13,
    image: Image13,
    gridClass: "col-start-2 row-start-3",
  },
  {
    id: 14,
    image: Image14,
    gridClass: "col-start-4 row-start-3",
  },
  {
    id: 15,
    image: Image15,
    gridClass: "col-start-5 row-start-3",
  },
  {
    id: 16,
    image: Image16,
    gridClass: "col-start-7 row-start-3",
  },
  {
    id: 17,
    image: Image17,
    gridClass: "col-start-8 row-start-3",
  },
];

const getGridPosition = (gridClass: string) => {
  const colMatch = gridClass.match(/col-start-(\d+)/);
  const rowMatch = gridClass.match(/row-start-(\d+)/);

  return {
    col: colMatch ? parseInt(colMatch[1]) : 0,
    row: rowMatch ? parseInt(rowMatch[1]) : 0,
  };
};

function PhotoGrid() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Tạo một hàm để tạo ra các giá trị transform khác nhau cho từng cột
  const createYTransform = (colIndex: number, rowIndex: number) => {
    // Tỷ lệ màn hình giữa các lần xuất hiện của mỗi dòng
    const screenRatio = 1 / 5;

    // Tính toán offset ban đầu dựa trên cả hàng và cột
    const offsetFactor = 1 + colIndex * 0.025 + (rowIndex - 1) / 3;

    // Điều chỉnh giá trị bắt đầu và kết thúc cho mỗi cột
    const startY = `${BASE_Y_POSITION * offsetFactor}vh`;

    // Tính toán scroll progress target cho mỗi cột
    const scrollTarget =
      ((rowIndex / 3 + colIndex / 8) * (1 + screenRatio)) / 3;

    return useTransform(
      scrollYProgress,
      [0, scrollTarget * 0.6],
      [startY, "0vh"],
    );
  };

  return (
    <div className="relative w-full bg-gray-100">
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ height: "500vh" }}
      >
        <div className="sticky top-0 left-0 mb-8 grid h-screen grid-cols-8 gap-2 p-2">
          {images.map((image) => {
            const { col, row } = getGridPosition(image.gridClass);
            const yTransform = createYTransform(col, row);
            const smoothYTransform = useSpring(yTransform, {
              stiffness: 100,
              damping: 10,
              mass: 0.1,
            });

            return (
              <motion.div
                style={{
                  top: smoothYTransform,
                  height: "calc(100vh/3)",
                }}
                key={image.id}
                className={`${image.gridClass} relative w-full`}
              >
                <div
                  style={{
                    backgroundImage: `url(${image.image.src})`,
                  }}
                  className="relative h-full w-full bg-cover bg-center"
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-[25vh] left-1/2 z-[99] flex w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-white/70 p-4 text-center">
        <h2 className="mb-2 flex gap-4 text-[16vh] font-bold text-black uppercase">
          <span className="text-red-500 drop-shadow-lg">CÁC</span>
          <span className="text-black/80 drop-shadow-lg">HOẠT</span>
          <span className="text-red-500 drop-shadow-lg">ĐỘNG</span>
          <span className="text-black/80 drop-shadow-lg">30/</span>
          <span className="text-red-500 drop-shadow-lg">4</span>
        </h2>
      </div>
    </div>
  );
}

export default PhotoGrid;

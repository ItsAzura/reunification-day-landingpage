import React, { useEffect, useRef } from "react";
import TortPaperImage from "@/public/assets/images/masks/tort-paper-square.png";
import SuKienImage1 from "@/public/assets/images/phase1/first-content/gp_miennam_nocolor.png";
import HoveredSuKienImage1 from "@/public/assets/images/phase1/first-content/gp_miennam_color.png";
import SuKienImage2 from "@/public/assets/images/phase1/first-content/giaiphong-miennam2-nocolor.jpg";
import HoveredSuKienImage2 from "@/public/assets/images/phase1/first-content/giaiphong-miennam2-color.jpg";
import SuKienImage3 from "@/public/assets/images/phase1/first-content/giaiphong-miennam3-nocolor.jpg";
import HoveredSuKienImage3 from "@/public/assets/images/phase1/first-content/giaiphong-miennam3-color.jpg";
import { motion, MotionValue, useSpring, useTransform } from "framer-motion";

// Danh sách các hình ảnh sự kiện
const images = [SuKienImage1, SuKienImage2, SuKienImage3];

/**
 * Props cho component ImageSection
 * @property data - Dữ liệu hình ảnh bao gồm hình ảnh gốc và hình ảnh khi hover
 * @property mousePosition - Vị trí chuột (x, y) được theo dõi bởi Framer Motion
 * @property scrollX - Giá trị scroll theo trục X được theo dõi bởi Framer Motion
 */
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

/**
 * ImageSection Component
 * Component con hiển thị một phần của slider với hiệu ứng hover
 * - Hiển thị hình ảnh gốc làm nền
 * - Hiển thị hình ảnh màu khi hover theo vị trí chuột
 */
const ImageSection = ({ data, mousePosition, scrollX }: ImageSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { x, y } = mousePosition;

  // Điều chỉnh vị trí X dựa trên scroll
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
      {/* Phần hình ảnh màu khi hover */}
      <motion.div
        className="fixed top-0 left-0 h-[30vw] w-[25vw] overflow-hidden rounded-[10px]"
        style={{ x: adjustedX, y }}
      >
        <img src={data.hoveredPicture} className="w-full object-cover" />
      </motion.div>
    </motion.section>
  );
};

/**
 * Props cho component ImageScrollSlider
 * @property scrollYOfContainerProgress - Tiến trình scroll của container cha
 */
type Props = {
  scrollYOfContainerProgress: MotionValue<number>;
};

/**
 * ImageScrollSlider Component
 * Component chính tạo hiệu ứng slider hình ảnh với các tính năng:
 * 1. Cuộn ngang dựa trên scroll dọc
 * 2. Hiệu ứng hover theo vị trí chuột
 * 3. Mask hình ảnh với texture giấy
 * 4. Animation mượt mà với spring physics
 */
export default function ImageScrollSlider({
  scrollYOfContainerProgress,
}: Props) {
  // Tính toán kích thước container dựa trên chiều rộng màn hình
  const windowWidth = window.innerWidth;
  const imageContainerWidth = windowWidth * 0.6; // 60% chiều rộng màn hình

  // Chuyển đổi scroll dọc thành scroll ngang
  const x = useTransform(
    scrollYOfContainerProgress,
    [0, 0.95],
    [0, -imageContainerWidth * 2],
  );

  // Tạo hiệu ứng spring cho scroll mượt mà
  const smoothX = useSpring(x, {
    stiffness: 200,
    damping: 20,
    mass: 0.1,
  });

  // Cấu hình spring cho hiệu ứng vignette
  const springOptions = {
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  };

  // Theo dõi vị trí chuột với spring physics
  const mousePosition = {
    x: useSpring(0, springOptions),
    y: useSpring(0, springOptions),
  };

  // Xử lý di chuyển chuột
  const handleMouseMove = (event: any) => {
    const { clientX, clientY } = event;
    const targetX = clientX - (window.innerWidth / 2) * 0.25;
    const targetY = clientY - (window.innerWidth / 2) * 0.3;
    mousePosition.x.set(targetX);
    mousePosition.y.set(targetY);
  };

  // Dữ liệu hình ảnh cho slider
  const data = [
    { picture: SuKienImage2.src, hoveredPicture: HoveredSuKienImage2.src },
    { picture: SuKienImage1.src, hoveredPicture: HoveredSuKienImage1.src },
    { picture: SuKienImage3.src, hoveredPicture: HoveredSuKienImage3.src },
  ];

  // Thêm và xóa event listener cho mouse move
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
      {/* Container chính cho slider */}
      <motion.div
        style={{ x: smoothX }}
        className="relative flex h-screen w-[300%] items-center"
      >
        {/* Render các section hình ảnh */}
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

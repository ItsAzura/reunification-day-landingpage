import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import BeVanDanImage from "@/public/assets/images/phase1/anh-hung/bevandan.jpeg";
import CuChinhLanImage from "@/public/assets/images/phase1/anh-hung/cuchinhlan.jpg";
import NguyenVanTroiImage from "@/public/assets/images/phase1/anh-hung/nguyenvantroi.jpg";
import NguyenVietXuanImage from "@/public/assets/images/phase1/anh-hung/nguyenvietxuan.jpg";
import PhanDinhGiotImage from "@/public/assets/images/phase1/anh-hung/phandinhgiot.jpg";
import ToVinhDienImage from "@/public/assets/images/phase1/anh-hung/tovinhdien.jpg";
import VoThiSauImage from "@/public/assets/images/phase1/anh-hung/vothisau.jpg";
import LyTuTrongImage from "@/public/assets/images/phase1/anh-hung/lytutrong.jpg";
import TranVanOnImage from "@/public/assets/images/phase1/anh-hung/tranvanon.jpg";
import TortPaperSquare from "@/public/assets/images/masks/tort-paper-square.png";
import Image from "next/image";

/**
 * Dữ liệu về các anh hùng dân tộc
 * Mỗi anh hùng bao gồm:
 * - name: Tên anh hùng
 * - image: Hình ảnh
 * - description: Mô tả (hiện đang để trống)
 * - position: Vị trí hiển thị (top, left)
 * - width: Chiều rộng ảnh
 * - link: Link Wikipedia
 * - gridPosition: Vị trí trong grid layout
 */
const heroes = [
  {
    name: "Bế Văn Đàn",
    image: BeVanDanImage,
    description: "Bế Văn Đàn là một nhà văn...",
    position: { top: "20px", left: "5%" },
    width: "420px",
    link: "https://vi.wikipedia.org/wiki/Bế_Văn_Đàn",
    gridPosition: { rowStart: 1, colStart: 1 },
  },
  {
    name: "Cù Chính Lan",
    image: CuChinhLanImage,
    description: "",
    position: { top: "-100px", left: "45%" },
    width: "264px",
    link: "https://vi.wikipedia.org/wiki/Cù_Chính_Lan",
    gridPosition: { rowStart: 1, colStart: 3 },
  },
  {
    name: "Nguyễn Văn Trỗi",
    image: NguyenVanTroiImage,
    description: "",
    position: { top: "-200px", left: "75%" },
    width: "284px",
    link: "https://vi.wikipedia.org/wiki/Nguyễn_Văn_Trỗi",
    gridPosition: { rowStart: 2, colStart: 2 },
  },
  {
    name: "Nguyễn Viết Xuân",
    image: NguyenVietXuanImage,
    description: "",
    position: { top: "-100px", left: "71%" },
    width: "320px",
    link: "https://vi.wikipedia.org/wiki/Nguyễn_Viết_Xuân",
    gridPosition: { rowStart: 3, colStart: 1 },
  },
  {
    name: "Phan Đình Giót",
    image: PhanDinhGiotImage,
    description: "",
    position: { top: "-600px", left: "6%" },
    width: "325px",
    link: "https://vi.wikipedia.org/wiki/Phan_Đình_Giót",
    gridPosition: { rowStart: 3, colStart: 3 },
  },
  {
    name: "Tô Vĩnh Diện",
    image: ToVinhDienImage,
    description: "",
    position: { top: "-450px", left: "80px" },
    width: "380px",
    link: "https://vi.wikipedia.org/wiki/Tô_Vĩnh_Diện",
    gridPosition: { rowStart: 4, colStart: 2 },
  },
  {
    name: "Võ Thị Sáu",
    image: VoThiSauImage,
    description: "",
    position: { top: "-190vh", left: "45vw" },
    width: "225px",
    link: "https://vi.wikipedia.org/wiki/Võ_Thị_Sáu",
    gridPosition: { rowStart: 5, colStart: 1 },
  },
  {
    name: "Lý Tự Trọng",
    image: LyTuTrongImage,
    description: "",
    position: { top: "-160vh", left: "58vw" },
    width: "240px",
    link: "https://vi.wikipedia.org/wiki/Lý_Tự_Trọng",
    gridPosition: { rowStart: 5, colStart: 3 },
  },
  {
    name: "Trần Văn Ơn",
    image: TranVanOnImage,
    description: "",
    position: { top: "-160vh", left: "58vw" },
    width: "240px",
    link: "https://vi.wikipedia.org/wiki/Trần_Văn_Ơn",
    gridPosition: { rowStart: 6, colStart: 2 },
  },
];

/**
 * HeroSection Component
 * Component hiển thị thông tin một anh hùng với các tính năng:
 * 1. Animation dựa trên scroll
 * 2. Hiệu ứng hover
 * 3. Link đến trang Wikipedia
 *
 * @param children - Nội dung component
 * @param top - Vị trí top (không sử dụng)
 * @param left - Vị trí left (không sử dụng)
 * @param rowStart - Vị trí bắt đầu trong grid row
 * @param colStart - Vị trí bắt đầu trong grid column
 */
function HeroSection({
  children,
  top,
  left,
  rowStart,
  colStart,
}: {
  children: React.ReactNode;
  top: string;
  left: string;
  rowStart: number;
  colStart: number;
}) {
  // Ref để theo dõi vị trí của component
  const targetRef = useRef<HTMLDivElement>(null);

  // Theo dõi tiến trình scroll
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 50%", "end 50%"], // Bắt đầu và kết thúc animation ở giữa viewport
  });

  // Chuyển đổi tiến trình scroll thành giá trị opacity và vị trí y
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
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
      className="w-fit hover:brightness-[1.35]" // Hiệu ứng sáng lên khi hover
    >
      {children}
    </motion.div>
  );
}

/**
 * VietNamHeroes Component
 * Component chính hiển thị grid các anh hùng dân tộc với các tính năng:
 * 1. Layout dạng grid 3 cột
 * 2. Hiệu ứng mask cho ảnh
 * 3. Animation khi scroll
 * 4. Link đến Wikipedia cho mỗi anh hùng
 */
function VietNamHeroes() {
  return (
    <div className="relative grid h-auto w-full grid-cols-3 grid-rows-6 gap-6 bg-transparent">
      {heroes.map((hero, index) => {
        return (
          <HeroSection
            key={index}
            top={hero.position.top}
            left={hero.position.left}
            rowStart={hero.gridPosition.rowStart}
            colStart={hero.gridPosition.colStart}
          >
            <Link
              href={hero.link}
              target="_blank"
              className="group relative flex size-full flex-col items-center gap-4"
            >
              <Image
                src={hero.image.src}
                alt={hero.name}
                width={300}
                height={300}
                className="size-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
                style={{
                  // Áp dụng mask cho ảnh
                  WebkitMaskImage: `url(${TortPaperSquare.src})`,
                  maskImage: `url(${TortPaperSquare.src})`,
                  WebkitMaskSize: "100% 100%",
                  maskSize: "100% 100%",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  // Thêm hiệu ứng đổ bóng
                  filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))",
                }}
              />
              <span className="text-base font-medium text-white">
                {hero.name}
              </span>
            </Link>
          </HeroSection>
        );
      })}
    </div>
  );
}

export default VietNamHeroes;

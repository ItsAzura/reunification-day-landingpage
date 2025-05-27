import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * BlurRevealText Component
 * Component tạo hiệu ứng reveal văn bản dựa trên scroll với các tính năng:
 * 1. Tách văn bản thành từng từ và ký tự
 * 2. Hiệu ứng fade in cho từng ký tự dựa trên vị trí scroll
 * 3. Responsive với kích thước màn hình
 */
export const BlurRevealText = ({ text }: { text: string }) => {
  // Ref để theo dõi vị trí của container
  const ref = useRef<HTMLDivElement>(null);

  // Theo dõi tiến trình scroll của container
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "end 0.25"], // Bắt đầu animation khi element cách top 95% và kết thúc khi cách top 25%
  });

  // Tách văn bản thành mảng các từ
  const words = text.split(" ");

  return (
    <motion.div
      ref={ref}
      className="flex w-[70vw] max-w-[1000px] min-w-[300px] flex-wrap text-[clamp(1.5rem,5vw,3rem)] leading-[1.2] text-white"
    >
      {/* Render từng từ với animation dựa trên vị trí scroll */}
      {words.map((word, i) => {
        // Tính toán khoảng thời gian animation cho mỗi từ
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word
            word={word}
            progress={scrollYProgress}
            range={[start, end]}
            key={i}
          />
        );
      })}
    </motion.div>
  );
};

/**
 * Word Component
 * Component con xử lý animation cho từng từ
 * @param word - Từ cần hiển thị
 * @param progress - Tiến trình scroll
 * @param range - Khoảng thời gian animation [start, end]
 */
const Word = ({
  word,
  range,
  progress,
}: {
  word: string;
  progress: MotionValue<number>;
  range: number[];
}) => {
  // Tách từ thành mảng các ký tự
  const chars = word.split("");
  // Tính toán khoảng thời gian cho mỗi ký tự
  const amount = range[1] - range[0];
  const step = amount / word.length;

  return (
    <div className="mr-3 tracking-tight">
      {/* Render từng ký tự với animation riêng */}
      {chars.map((char, i) => {
        const start = range[0] + i * step;
        const end = range[0] + step * (i + 1);
        return (
          <Character key={i} range={[start, end]} progress={progress}>
            {char}
          </Character>
        );
      })}
    </div>
  );
};

/**
 * Character Component
 * Component con xử lý animation cho từng ký tự
 * @param children - Ký tự cần hiển thị
 * @param progress - Tiến trình scroll
 * @param range - Khoảng thời gian animation [start, end]
 */
const Character = ({
  children,
  progress,
  range,
}: {
  children: string; // Thay đổi any thành string vì children luôn là string
  progress: MotionValue<number>;
  range: number[];
}) => {
  // Chuyển đổi tiến trình scroll thành giá trị opacity
  const opacity = useTransform(progress, range, [0, 1]);

  return <motion.span style={{ opacity }}>{children}</motion.span>;
};

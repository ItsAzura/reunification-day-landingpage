import React, { useRef, useState } from "react";
import PreLoadingContent from "./PreLoadingContent";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useAudio } from "@/providers/AudioProvider";
import FirstContent from "./FirstContent";
import { BlurRevealText } from "@/components/AnimatedText/BlurryTextRevealSroll";
import SecondContent from "./SecondContent";

// Định nghĩa các trạng thái nội dung có thể có
type Contents = "pre-loading" | "first-content";

/**
 * Phase1Section Component
 * Component chính của Phase 1, quản lý việc hiển thị và chuyển đổi giữa các phần nội dung
 * Bao gồm:
 * 1. PreLoadingContent: Phần nội dung loading ban đầu
 * 2. FirstContent: Phần nội dung đầu tiên về sự kiện 30/4
 * 3. SecondContent: Phần nội dung thứ hai
 */
function Phase1Section() {
  // State quản lý nội dung hiện tại đang hiển thị
  const [currentContent, setCurrentContent] = useState<Contents>("pre-loading");
  // Hook để điều khiển audio
  const { pauseAudio } = useAudio();

  // Ref và hook scroll để theo dõi vị trí cuộn
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Tính toán các giá trị animation cho phần preloading
  const scale1 = useTransform(scrollYProgress, [0, 0.2], [1, 0.7]);
  const rotate1 = useTransform(scrollYProgress, [0, 0.2], [0, -5]);

  // Tính toán các giá trị animation cho phần nội dung chính
  const scale2 = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const rotate2 = useTransform(scrollYProgress, [0, 0.2], [5, 0]);

  // Xử lý khi hoàn thành phần preloading
  const handleCompletePreloadingContent = () => {
    setCurrentContent("first-content");
  };

  // Xử lý tạm dừng audio khi cuộn đến cuối trang
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.15) {
      pauseAudio();
    }
  });

  return (
    <section className="size-auto">
      <div ref={containerRef} className="relative h-auto w-full bg-black">
        {/* Phần nội dung preloading với animation scale và rotate */}
        <motion.div
          className="sticky top-0 left-0 h-screen w-full rounded-[10px]"
          style={{ scale: scale1, rotate: rotate1 }}
        >
          <PreLoadingContent onComplete={handleCompletePreloadingContent} />
        </motion.div>

        {/* Phần nội dung chính với animation scale và rotate ngược lại */}
        <motion.div
          className="relative z-[100] min-h-screen w-full bg-[var(--foreground)]"
          style={{ scale: scale2, rotate: rotate2 }}
        >
          <FirstContent />
          <SecondContent />
        </motion.div>
      </div>
    </section>
  );
}

export default Phase1Section;

import { useAudio } from "@/providers/AudioProvider";
import { useMotionValueEvent, useScroll } from "framer-motion";
import React, { useRef } from "react";
import HeroContent from "./HeroContent";
import EventEntryContent from "./EventEntryContent";
import EventListPresentation from "./EventListPresentation";
import EndPhase2Content from "./EndPhase2Content";

/**
 * Phase2Section Component
 * Component chính của phần 2 với các tính năng:
 * 1. Theo dõi scroll để phát nhạc nền
 * 2. Hiển thị nội dung theo thứ tự:
 *    - HeroContent: Phần hero với animation
 *    - EventEntryContent: Phần giới thiệu sự kiện
 *    - EventListPresentation: Danh sách sự kiện
 *    - EndPhase2Content: Phần kết thúc với gallery ảnh
 */
export default function Phase2Section() {
  // Ref để theo dõi vị trí của container
  const containerRef = useRef<HTMLDivElement>(null);

  // Theo dõi tiến trình scroll của container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"], // Bắt đầu và kết thúc animation khi container xuất hiện
  });

  // Sử dụng context để quản lý âm thanh
  const { playForSection, isPlaying } = useAudio();

  // Xử lý sự kiện scroll để phát nhạc
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isPlaying) return;

    if (latest > 0) {
      playForSection("phase-2-section");
    }
  });

  return (
    <div
      ref={containerRef}
      className="h-auto w-full bg-[var(--color-white-2)]"
      id="phase2-section"
    >
      <HeroContent />
      <EventEntryContent />
      <EventListPresentation />
      <EndPhase2Content />
    </div>
  );
}

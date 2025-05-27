import { BlurRevealText } from "@/components/AnimatedText/BlurryTextRevealSroll";
import React from "react";
import VietNamHeroes from "./VietNamHeroes";

const secondText =
  "Một lần nữa, xin cám ơn những người lính đã không ngại hy sinh, chiến đấu vì Tổ quốc. Chính nhờ sự dũng cảm và cống hiến của họ mà các thế hệ mai sau mới có được cuộc sống hòa bình hôm nay, để cùng nhau tưởng nhớ và trân trọng khoảnh khắc kỷ niệm 150 năm ngày giải phóng đất nước.";

/**
 * SecondContent Component
 * Component hiển thị phần nội dung thứ hai của Phase 1, bao gồm:
 * 1. Đoạn text đầu tiên về sự hy sinh của các anh hùng
 * 2. Component VietNamHeroes hiển thị hình ảnh các anh hùng
 * 3. Đoạn text thứ hai về lời cảm ơn và tưởng nhớ
 */
function SecondContent() {
  return (
    <div className="w-full bg-[var(--foreground)] px-4 pt-24">
      {/* Đoạn text đầu tiên với hiệu ứng blur reveal */}
      <BlurRevealText text="Đằng sau thắng lợi ấy là biết bao hy sinh thầm lặng và anh dũng của những người con đất Việt – những anh hùng đã ngã xuống vì độc lập, tự do và hòa bình cho Tổ quốc. Chúng ta mãi ghi nhớ và tri ân công lao to lớn ấy." />

      {/* Component hiển thị hình ảnh các anh hùng */}
      <VietNamHeroes />

      {/* Đoạn text thứ hai với hiệu ứng blur reveal */}
      <div className="mt-[20vh] flex items-center justify-center py-20">
        <BlurRevealText text={secondText} />
      </div>
    </div>
  );
}

export default SecondContent;

import AnimatedTextReveal from "@/components/AnimatedText/AnimatedTextReveal";
import { MotionValue, useMotionValueEvent } from "framer-motion";
import React, { useState } from "react";

/**
 * Dữ liệu nội dung văn bản cho 3 phần:
 * 1. Bối cảnh lịch sử
 * 2. Diễn biến chính
 * 3. Ý nghĩa lịch sử
 */
const texts = [
  {
    title: "Bối cảnh lịch sử dẫn đến ngày 30 tháng 4 năm 1975",
    content:
      "Sự kiện ngày 30 tháng 4 năm 1975 là kết quả của Chiến dịch Hồ Chí Minh, đỉnh cao của cuộc Tổng tiến công và nổi dậy mùa Xuân năm 1975, đánh dấu sự sụp đổ của chính quyền Việt Nam Cộng hòa và thống nhất đất nước. Cuối năm 1974, sau các chiến thắng lớn tại Phước Long, Tây Nguyên và Huế - Đà Nẵng, Bộ Chính trị Trung ương Đảng Cộng sản Việt Nam nhận định thời cơ chiến lược đã đến. Hội nghị Bộ Chính trị khẳng định: Cả năm 1975 là thời cơ và quyết định giải phóng hoàn toàn miền Nam trước mùa mưa. Chiến dịch Hồ Chí Minh được đặt tên để vinh danh Chủ tịch Hồ Chí Minh, với mệnh lệnh Thần tốc, táo bạo, bất ngờ, chắc thắng do Đại tướng Võ Nguyên Giáp truyền đi, thúc đẩy tinh thần chiến đấu của quân và dân Việt Nam. Trước đó, các căn cứ phòng thủ quan trọng của đối phương như Xuân Lộc và Phan Rang đã bị quân Giải phóng đánh chiếm, mở đường cho cuộc tấn công vào Sài Gòn.",
  },
  {
    title: "Diễn biến chính của ngày 30 tháng 4 năm 1975",
    content:
      "Vào lúc 17 giờ ngày 26 tháng 4 năm 1975, Chiến dịch Hồ Chí Minh chính thức bắt đầu với năm cánh quân vượt qua tuyến phòng thủ của đối phương, tiến vào trung tâm Sài Gòn. Đến sáng ngày 30 tháng 4, quân Giải phóng đồng loạt tổng tiến công từ bốn hướng. Khoảng 10 giờ 45 phút, xe tăng và bộ binh của Quân Giải phóng tiến vào Dinh Độc Lập, bắt toàn bộ Nội các chính quyền Sài Gòn. Xe tăng  T-59 số hiệu 390 do Chính trị viên Vũ Đăng Toàn chỉ huy, đã húc đổ cổng chính Dinh Độc Lập, trong khi  xe tăng T-54B mang số hiệu 843 thuộc Đại đội 4, Tiểu đoàn 1, Lữ đoàn Tăng thiết giáp 203, Quân đoàn 2 do Đại đội trưởng Bùi Quang Thận làm Trưởng xe, bị kẹt tại cổng phụ. Trung úy Bùi Quang Thận đã giật lá cờ Việt Nam Cộng hòa và kéo cờ Mặt trận Dân tộc Giải phóng miền Nam Việt Nam lên nóc Dinh lúc 11 giờ 30 phút, đánh dấu chiến thắng. Tổng thống Dương Văn Minh, nhậm chức từ ngày 28 tháng 4, tuyên bố đầu hàng vô điều kiện vào khoảng 13 giờ 30 phút cùng ngày. Lá cờ cách mạng tung bay trên Dinh Độc Lập báo hiệu sự toàn thắng của chiến dịch.",
  },
  {
    title: "Ý nghĩa lịch sử của sự kiện",
    content:
      "Ngày 30 tháng 4 năm 1975 được ghi vào lịch sử Việt Nam như một mốc son chói lọi, kết thúc 30 năm chiến tranh chống thực dân và đế quốc, hoàn thành sự nghiệp giải phóng dân tộc và thống nhất đất nước. Chiến thắng này chấm dứt ách thống trị của chủ nghĩa thực dân mới tại miền Nam, mở ra kỷ nguyên độc lập dân tộc và chủ nghĩa xã hội. Theo đánh giá tại Đại hội Đảng toàn quốc lần thứ IV (1976), đây là “một trong những trang chói lọi nhất” của dân tộc Việt Nam, đồng thời là “một chiến công vĩ đại của thế kỷ XX” với tầm quan trọng quốc tế. Thắng lợi này không chỉ thể hiện trí tuệ và tài thao lược của Đảng Cộng sản Việt Nam mà còn chứng minh tinh thần quật khởi, đoàn kết của nhân dân Việt Nam, nhận được sự ủng hộ mạnh mẽ từ bạn bè quốc tế. Sự kiện cũng đánh dấu sự thất bại nặng nề của đế quốc Mỹ, mở ra “thời kỳ sau Việt Nam” trong lịch sử chính trị thế giới.",
  },
];

/**
 * Props cho component TextDisplay
 * @property scrollYOfContainerProgress - Tiến trình scroll của container cha
 */
type Props = {
  scrollYOfContainerProgress: MotionValue<number>;
};

/**
 * TextDisplay Component
 * Component hiển thị nội dung văn bản với các tính năng:
 * 1. Chuyển đổi nội dung dựa trên vị trí scroll
 * 2. Hiệu ứng reveal cho tiêu đề
 * 3. Định dạng văn bản với style đặc biệt
 */
function TextDisplay({ scrollYOfContainerProgress }: Props) {
  // State quản lý index của nội dung hiện tại
  const [currentIndex, setCurrentIndex] = useState(0);

  // Theo dõi scroll và cập nhật nội dung tương ứng
  useMotionValueEvent(scrollYOfContainerProgress, "change", (value) => {
    if (value < 0.33) {
      setCurrentIndex(0);
    } else if (value < 0.66) {
      setCurrentIndex(1);
    } else {
      setCurrentIndex(2);
    }
  });

  const renderedText = texts[currentIndex];

  return (
    <div className="relative w-[40%] flex-1 px-6 py-4">
      {/* Tiêu đề với hiệu ứng reveal */}
      <AnimatedTextReveal
        key={currentIndex}
        text={renderedText.title}
        className="text-[1.6rem] font-bold text-[var(--color-red-2)] uppercase text-shadow-md"
      />
      {/* Nội dung văn bản với style đặc biệt cho chữ cái đầu */}
      <p className="mt-4 text-justify text-[2.6vh] text-white first-letter:text-4xl first-letter:font-bold">
        {renderedText.content}
      </p>
    </div>
  );
}

export default TextDisplay;

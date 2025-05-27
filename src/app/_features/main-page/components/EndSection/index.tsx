import { motion } from "framer-motion";
import React from "react";

/**
 * EndSection Component
 * Component hiển thị phần kết thúc của trang với các tính năng:
 * 1. Animation scroll vô tận cho nội dung
 * 2. Hiển thị thông tin về người thực hiện và âm nhạc
 * 3. Lời cảm ơn
 */
function EndSection() {
  return (
    <div className="relative h-[100vh] w-full overflow-hidden bg-[var(--foreground)]">
      <motion.div
        initial={{
          top: "-75vh", // Vị trí bắt đầu (phía trên viewport)
        }}
        animate={{
          top: ["-75vh", "130vh"], // Di chuyển từ trên xuống dưới viewport
        }}
        transition={{
          duration: 20, // Thời gian hoàn thành một chu kỳ animation
          times: [0, 1], // Thời điểm bắt đầu và kết thúc
          repeat: Infinity, // Lặp lại vô tận
          repeatDelay: 1, // Độ trễ giữa các lần lặp
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex w-full flex-col gap-4">
          {/* Thông tin người thực hiện */}
          <div className="flex flex-col items-center">
            <span className="text-[3.2vh] font-bold text-white">
              SINH VIÊN THỰC HIỆN
            </span>
            <span className="text-[2.4vh] text-white">Phạm Văn Nhật Huy</span>
          </div>

          {/* Thông tin âm nhạc */}
          <div className="flex flex-col items-center">
            <span className="mb-2 text-[3.2vh] font-bold text-white">
              ÂM NHẠC
            </span>
            <span className="text-center text-[2.4vh] text-white">
              HÀO KHÍ VIỆT NAM | OPENING THEME SONG | CHIẾN THẦN LẠC HỒNG | HOLY
              THẮNG x MYOMOUSE
            </span>
            <span className="text-[2.4vh] text-white">
              MỘT VÒNG VIỆT NAM (Around Viet Nam) - Tùng Dương | Beat Version
            </span>
          </div>

          {/* Lời cảm ơn */}
          <div className="flex flex-col items-center">
            <span className="mb-2 text-center text-[5.4vh] text-white">
              CÁM ƠN QUÝ THẦY CÔ VÀ CÁC BẠN ĐÃ XEM SẢN PHẨM CỦA EM
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default EndSection;

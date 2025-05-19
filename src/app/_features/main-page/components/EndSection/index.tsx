import useSmoothScroll from "@/hooks/useSmoothScroll";
import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";

function EndSection() {
  return (
    <div className="relative h-[100vh] w-full overflow-hidden bg-[var(--foreground)]">
      <motion.div
        initial={{
          top: "-75vh",
        }}
        animate={{
          top: ["-75vh", "130vh"],
        }}
        transition={{
          // type: "spring",
          duration: 20,
          times: [0, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col items-center">
            <span className="text-[3.2vh] font-bold text-white">
              SINH VIÊN THỰC HIỆN
            </span>
            <span className="text-[2.4vh] text-white">Phạm Văn Nhật Huy</span>
          </div>
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

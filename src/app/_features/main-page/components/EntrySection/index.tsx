import { useAudio } from "@/providers/AudioProvider";
import React from "react";
import Image from "next/image";
import DongSonDrumImage from "@/public/assets/images/dongson_drum.png";
import DongSonDrumDecorationImage from "@/public/assets/images/dongson_drum4.png";
import GiaiPhongLogoImage from "@/public/assets/images/logo_50nam_giaiphong.png";
import HoChiMinhImage from "@/public/assets/images/bacho.png";
import { motion } from "framer-motion";
import SvgPaperFilter from "@/components/SvgPaperFilter";
import { GoUnmute } from "react-icons/go";
import MagneticFramer from "@/components/MagneticFramer";
import { useHomePageContext } from "@/app/context";
import BacHoImage from "@/public/assets/images/anh_bacho.png";

/**
 * EntrySection Component
 * Component hiển thị phần mở đầu của trang với các tính năng:
 * 1. Thông tin sinh viên và logo
 * 2. Tiêu đề chính với hiệu ứng
 * 3. Nút phát nhạc nền
 * 4. Animation trống đồng
 * 5. Nút chuyển section
 */
function EntrySection() {
  // Sử dụng context để quản lý âm thanh và trạng thái hiển thị
  const { playForSection, stopAudio } = useAudio();
  const { setVisibleMainSectionsFn } = useHomePageContext();

  // Xử lý sự kiện phát nhạc
  const handlePlaySound = () => {
    playForSection("entry-section");
  };

  // Xử lý sự kiện chuyển section
  const handleGoToNextSection = () => {
    // Stop the audio is playing
    stopAudio();

    // Set entry section is not visible
    setVisibleMainSectionsFn((prev) => ({
      ...prev,
      entrySection: false,
      phase1Section: true,
    }));
  };

  return (
    <div className="relative flex h-screen w-full items-center overflow-hidden">
      {/* Phần thông tin bên trái */}
      <div className="flex h-full w-2/3 items-center">
        {/* Thông tin sinh viên và logo */}
        <div className="absolute top-0 left-0 m-10 flex gap-10 border-l-2 border-[var(--color-red-1)] px-2">
          <div className="flex flex-col gap-2">
            <span className="text-[2.4vh] font-medium">
              <span className="font-bold">SINH VIÊN THỰC HIỆN</span> / PHẠM VĂN
              NHẬT HUY
            </span>
            <span className="text-[2.4vh] font-medium">
              <span className="font-bold">MÃ SINH VIÊN</span>/ 21115053120318
            </span>
            <span className="text-[2.4vh] font-medium">
              <span className="font-bold">KHOA </span>/ CÔNG NGHỆ SỐ
            </span>
          </div>
          <div className="flex gap-6">
            <Image
              src={GiaiPhongLogoImage}
              alt="logo 50 nam giai phong mien nam"
              className="w-[6.4vw] bg-transparent"
            />

            <Image
              src={HoChiMinhImage}
              alt="logo chu tich Ho Chi Minh"
              className="w-[6.4vw] rounded-sm bg-transparent"
            />
          </div>
        </div>

        <div className="absolute left-0 z-[2] mt-[-80px] ml-10 flex flex-col">
          <h1 className="mb-2 text-[10vh] text-[var(--color-red-1)] text-shadow-[2px_4px_10px_rgb(0_0_0_/_0.35)]">
            LỄ KỶ NIỆM
          </h1>
          <h1 className="text-[6.8vh] font-semibold text-shadow-[2px_4px_10px_rgb(0_0_0_/_0.35)]">
            <span className="text-[var(--color-red-1)]">50</span> NĂM GIẢI PHÓNG
            ĐẤT NƯỚC
            {/* <span className="text-[var(--color-red-1)]">ĐẤT NƯỚC</span> */}
          </h1>
          <h1 className="text-[6.8vh] font-semibold text-shadow-[2px_4px_10px_rgb(0_0_0_/_0.35)]">
            135 NĂM SINH NHẬT{" "}
            <span className="text-[var(--color-red-1)]">BÁC HỒ</span>
          </h1>
        </div>

        <div className="absolute bottom-10 left-10 flex items-center justify-between gap-2 rounded-full border-2 border-[var(--color-red-1)] bg-white p-2">
          <p className="text-xs">Bật nhạc nền để có trải nghiệm tốt nhất</p>
          <button
            type="button"
            className="z-[2] flex cursor-pointer items-center gap-2 rounded-full bg-[var(--color-red-1)] px-4 py-2 text-xs text-white hover:opacity-90"
            onClick={handlePlaySound}
          >
            Phát nhạc nền
            <GoUnmute className="font-bold" />
          </button>
        </div>
      </div>

      <div className="z-[1] flex h-full w-1/3 items-center">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            ease: "linear",
            repeat: Infinity,
            duration: 100,
          }}
          className="translate-x-1/2 scale-[1.8]"
        >
          <Image
            src={DongSonDrumImage}
            alt="trong dong dong son"
            className="w-full object-cover opacity-[0.8]"
          />
        </motion.div>
      </div>

      {/* Start next section button */}
      <div className="absolute bottom-10 left-1/2 z-[2]">
        <MagneticFramer>
          <button
            onClick={handleGoToNextSection}
            className="flex size-[5vw] cursor-pointer items-center justify-center rounded-full bg-[var(--color-red-1)] text-xs text-white outline-2 outline-offset-2 outline-[var(--color-red-1)] transition-all hover:scale-[0.9]"
          >
            BẮT ĐẦU
          </button>
        </MagneticFramer>
      </div>

      {/* Dong Son Drum Decoration */}
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          ease: "linear",
          repeat: Infinity,
          duration: 100,
        }}
        className="absolute top-0 right-[26%] z-[1] -translate-y-[45%]"
      >
        <Image
          className="w-[46vh]"
          src={DongSonDrumDecorationImage}
          alt="trong dong"
        />
      </motion.div>

      {/* Dong Son Drum Decoration in bottom*/}
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          ease: "linear",
          repeat: Infinity,
          duration: 100,
        }}
        className="absolute right-[43%] bottom-0 z-[1] translate-x-[50%] translate-y-[55%]"
      >
        <Image
          className="w-[56vh]"
          src={DongSonDrumDecorationImage}
          alt="trong dong"
        />
      </motion.div>

      <div className="absolute top-0 right-0 z-[0] h-full w-[40%] bg-black/90"></div>

      {/* Ho Chi Minh Image*/}
      <Image
        src={BacHoImage}
        alt="Ho Chi Minh"
        className="absolute top-[38%] left-[60%] z-[1] w-[20vw] -translate-x-1/2 -translate-y-1/2"
      />

      {/* Paper background */}
      <div className="absolute inset-0 z-[-1]">
        <div className="absolute">
          <SvgPaperFilter id="paper-filter" />
        </div>
        <div
          style={{
            filter: "url(#paper-filter)",
            WebkitFilter: "url(#paper-filter)",
            msFilter: "url(#paper-filter)",
            width: "100%",
            height: "100%",
          }}
        ></div>
      </div>
    </div>
  );
}

export default EntrySection;

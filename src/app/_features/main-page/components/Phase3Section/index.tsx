import SectionContent1 from "@/components/SectionContent/SectionContent1";
import React from "react";
import BacHoImage from "@/public/assets/images/phase3/bacho/Chan-dung-Bac-Ho.webp";
import HoChiMinhImagesGrid from "./HoChiMinhImagesGrid";

/**
 * Phase3Section Component
 * Component hiển thị phần 3 của trang với các tính năng:
 * 1. Hiển thị nội dung về Chủ tịch Hồ Chí Minh
 * 2. Sử dụng SectionContent1 để hiển thị nội dung với mask và background
 * 3. Hiển thị grid ảnh về Bác Hồ
 */
function Phase3Section() {
  return (
    <div className="w-full overflow-hidden">
      {/* Phần nội dung chính về Bác Hồ */}
      <SectionContent1
        mask
        backgroundImageSize="contain"
        sectionImageSrc={BacHoImage.src}
        renderSectionContent={() => {
          return (
            <div className="flex flex-col gap-2">
              {/* Đoạn văn 1: Giới thiệu về ngày sinh nhật Bác */}
              <p className="text-justify text-[2.8vh] text-black first-letter:text-[4.2vh] first-letter:font-bold">
                Trong những ngày Tháng Năm lịch sử, mỗi người dân Việt Nam chúng
                ta đều nhớ đến ngày sinh nhật Bác Hồ kính yêu, trong tim luôn
                trào dâng một cảm xúc bồi hồi khó tả khi hướng về Thủ đô Hà Nội,
                hướng về Lăng Chủ tịch Hồ Chí Minh - trái tim của cả nước với
                tấm lòng trân trọng, biết ơn và thành kính.
                <br />
              </p>
              {/* Đoạn văn 2: Lịch sử kỷ niệm ngày sinh Bác */}
              <p className="text-justify text-[2.8vh] text-black first-letter:text-[4.2vh] first-letter:font-bold">
                Ngày 19/5/1946 lần đầu tiên Nhân dân ta kỷ niệm ngày sinh của
                Chủ tịch Hồ Chí Minh, lãnh tụ vĩ đại của Ðảng, Nhà nước và Nhân
                dân ta. Từ đó trở đi cứ đến dịp 19/5 toàn dân ta cùng sống những
                giờ phút đặc biệt, niềm vui dâng trào, kính yêu Bác vô hạn.
              </p>
              {/* Đoạn văn 3: Di sản của Bác */}
              <p className="text-justify text-[2.8vh] text-black first-letter:text-[4.2vh] first-letter:font-bold">
                Đã hơn 56 năm kể từ ngày Bác đi xa, nhưng sự nghiệp và tư tưởng,
                tấm gương đạo đức vĩ đại, sáng ngời của Bác vẫn sống mãi trong
                sự nghiệp cách mạng của dân tộc, trường tồn theo thời gian, mãi
                mãi tỏa sáng trong hành trình phát triển của Nhân dân ta và nhân
                loại tiến bộ.
              </p>
              {/* Đoạn văn 4: Tiểu sử Bác */}
              <p className="text-justify text-[2.8vh] text-black first-letter:text-[4.2vh] first-letter:font-bold">
                Bác là danh nhân văn hóa, nhà cách mạng lỗi lạc, người sáng lập
                Đảng Cộng sản Việt Nam. Lúc nhỏ tên là Nguyễn Sinh Cung khi đi
                học là Nguyễn Tất Thành, trong nhiều năm hoạt động cách mạng lấy
                tên là Nguyễn Ái Quốc và nhiều bí danh, bút danh khác. Quê ở
                làng Kim Liên, huyện Nam Đàn, tỉnh Nghệ An.
              </p>
            </div>
          );
        }}
        headerText="KỶ NIỆM 135 NĂM NGÀY SINH NHẬT CHỦ TỊCH HỒ CHÍ MINH - 19 THÁNG 5 NĂM 1890"
      />
      {/* Grid hiển thị ảnh về Bác Hồ */}
      <HoChiMinhImagesGrid />
    </div>
  );
}

export default Phase3Section;

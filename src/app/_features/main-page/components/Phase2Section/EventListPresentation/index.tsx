import React from "react";
import SectionContent1 from "@/components/SectionContent/SectionContent1";
import HoatDong1Image from "@/public/assets/images/phase2/hoatdong/hoatdong1.jpg";
import HoatDong2Image from "@/public/assets/images/phase2/hoatdong/hoatdong3.jpg";
import ReactPlayer from "react-player";

function EventListPresentation() {
  return (
    <div className="w-full bg-[var(--color-white-1)]">
      <SectionContent1
        sectionImageSrc={HoatDong1Image.src}
        renderSectionContent={() => {
          return (
            <div className="flex flex-col gap-2">
              <p className="text-justify text-[2.8vh] text-black first-letter:text-[4.2vh] first-letter:font-bold">
                Sáng 30/4, tại Thành phố Hồ Chí Minh rực rỡ tên vàng, Ban Chấp
                hành Trung ương Đảng, Quốc hội, Chủ tịch nước, Chính phủ, Ủy ban
                Trung ương Mặt trận Tổ quốc Việt Nam và Ủy ban nhân dân Thành
                phố Hồ Chí Minh đã tổ chức trọng thể Lễ kỷ niệm 50 năm Ngày Giải
                phóng miền Nam, thống nhất đất nước (30/4/1975-30/4/2025).{" "}
                <br />
              </p>
              <p className="text-justify text-[2.8vh] text-black first-letter:text-[4.2vh] first-letter:font-bold">
                Từ sáng sớm, thời tiết ở Thành phố Hồ Chí Minh rất đẹp, trong
                không khí tưng bừng, phấn khởi, rực rỡ cờ hoa kỷ niệm ngày lễ
                lớn, tại khu vực Quảng trường Thống Nhất (dọc tuyến đường Lê
                Duẩn, trước cổng Hội trường Thống Nhất), đông đảo cán bộ, chiến
                sỹ, đồng bào cùng các tầng lớp nhân dân Thành phố Hồ Chí Minh đã
                tề tựu chào mừng Lễ kỷ niệm.
              </p>

              <p className="text-justify text-[2.8vh] text-black first-letter:text-[4.2vh] first-letter:font-bold">
                Dự Lễ kỷ niệm có các đồng chí lãnh đạo, nguyên lãnh đạo cấp cao
                của Đảng, Nhà nước, Quốc hội, Chính phủ, Mặt trận Tổ quốc Việt
                Nam; lãnh đạo các ban, bộ, ngành Trung ương, địa phương, các lực
                lượng vũ trang, cùng các đồng chí lão thành cách mạng, Mẹ Việt
                Nam anh hùng, Anh hùng LLVTND, Anh hùng Lao động, đại diện các
                gia đình chính sách và lực lượng từng tham gia Chiến dịch Hồ Chí
                Minh lịch sử.
              </p>

              <p className="text-justify text-[2.8vh] text-black first-letter:text-[4.2vh] first-letter:font-bold">
                Tham dự Lễ kỷ niệm còn có các đoàn đại biểu cấp cao của Lào,
                Campuchia, Cuba, Belarus, Trung Quốc và đại diện các tổ chức
                quốc tế, đại sứ, tùy viên quốc phòng, cùng nhiều bạn bè quốc tế
                từng ủng hộ Việt Nam.
              </p>
            </div>
          );
        }}
        headerText="Tổ chức trọng thể Lễ kỷ niệm 50 năm Ngày Giải phóng miền Nam, thống nhất đất nước"
      />
      {/*  */}
      <SectionContent1
        reverse={true}
        sectionImageSrc={HoatDong2Image.src}
        renderSectionContent={() => {
          return (
            <div className="flex size-full flex-col gap-2">
              <p className="text-justify text-[2.8vh] text-black first-letter:text-[4.2vh] first-letter:font-bold">
                Sáng 30/4, tại Thành phố Hồ Chí Minh rực rỡ tên vàng, Ban Chấp
                hành Trung ương Đảng, Quốc hội, Chủ tịch nước, Chính phủ, Ủy ban
                Trung ương Mặt trận Tổ quốc Việt Nam và Ủy ban nhân dân Thành
                phố Hồ Chí Minh đã tổ chức trọng thể Lễ kỷ niệm 50 năm Ngày Giải
                phóng miền Nam, thống nhất đất nước (30/4/1975-30/4/2025). Tổng
                Bí thư Tô Lâm đọc Diễn văn Lễ kỷ niệm. Cổng TTĐT Chính phủ trân
                trọng giới thiệu nội dung Diễn văn:
              </p>
              <div className="flex-1 overflow-hidden rounded-lg">
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=fc7ro-kkWt0"
                  controls={true}
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          );
        }}
        headerText="Diễn văn của tổng bí thư tô lâm tại lễ kỷ niệm 50 năm Ngày Giải phóng miền Nam, thống nhất đất nước"
      />
      {/*  */}
      <SectionContent1
        sectionImageSrc={HoatDong1Image.src}
        renderSectionContent={() => {
          return (
            <div className="flex h-full flex-col gap-2">
              <p className="block text-justify text-[2.8vh] text-black first-letter:text-[4.2vh] first-letter:font-bold">
                Ngày 30/4/2025, Thành phố Hồ Chí Minh sẽ tổ chức lễ diễu binh
                diễu hành cấp quốc gia kỷ niệm 50 năm Ngày Giải phóng miền Nam,
                thống nhất đất nước (30/4/1975 - 30/4/2025).
                <br />
              </p>
              <a
                href="https://thuvienphapluat.vn/phap-luat/ho-tro-phap-luat/nhin-lai-36-khoi-dieu-binh-va-12-khoi-dieu-hanh-chinh-thuc-ngay-30-4-nam-2025-cac-khoi-dieu-binh-da-13529-213595.html"
                target="blank"
                className="block text-[2.8vh] font-bold text-red-500 hover:underline"
              >
                Xem thêm thông tin tại đây!
              </a>
              <div className="flex-1 overflow-hidden rounded-lg">
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=UkhBB0p6ArE"
                  controls={true}
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          );
        }}
        headerText="Diễu binh, diễu hành kỷ niệm 50 năm Ngày Giải Phóng Miền Nam, thống nhất đất nước"
      />
    </div>
  );
}

export default EventListPresentation;

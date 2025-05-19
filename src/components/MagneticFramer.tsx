import { motion, useMotionValue, useSpring } from "framer-motion";
import React, { useRef } from "react";

type Props = {
  children: React.ReactNode;
  strength?: number; // Thêm tham số điều chỉnh độ mạnh của hiệu ứng
};

function MagneticFramer({ children, strength = 40 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // Sử dụng useMotionValue để theo dõi vị trí chuột
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Sử dụng useSpring để tạo animation mượt mà hơn
  const springConfig = { damping: 25, stiffness: 300, mass: 0.1 };
  const xSpring = useSpring(mouseX, springConfig);
  const ySpring = useSpring(mouseY, springConfig);

  // Giới hạn khoảng di chuyển tối đa
  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();

    // Tính toán vị trí tương đối so với tâm của phần tử
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Tính khoảng cách từ con trỏ đến tâm
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Áp dụng hệ số strength để điều chỉnh độ mạnh của hiệu ứng
    // và chia cho một hằng số để giảm cường độ
    // mouseX.set((distanceX / width) * strength);
    // mouseY.set((distanceY / height) * strength);

    mouseX.set(distanceX);
    mouseY.set(distanceY);
  };

  const reset = () => {
    // Đặt giá trị về 0 khi rời chuột
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="relative inline-block">
      <motion.div
        ref={ref}
        style={{
          x: xSpring,
          y: ySpring,
        }}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        className="inline-block"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default MagneticFramer;

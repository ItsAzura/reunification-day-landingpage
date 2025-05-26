import React, { useEffect, useRef, useState } from "react";
import { useAnimate } from "framer-motion";
import useClientRect from "@/hooks/useClientRect";

type Props = {
  onComplete: () => void;
};

/**
 * CounterAnimation Component
 * Tạo hiệu ứng đếm số từ 00 đến 99 với animation mượt mà
 * Sử dụng hai cột số riêng biệt cho hàng chục và hàng đơn vị
 */
function CounterAnimation({ onComplete }: Props) {
  // State để theo dõi số hiện tại (không được sử dụng trong UI nhưng có thể dùng để debug)
  const [currentNumber, setCurrentNumber] = useState(0);

  // Mảng các chữ số từ 0-9 cho cột hàng chục
  const firstLetters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  // Mảng các chữ số từ 0-9 cho cột hàng đơn vị
  const secondLetters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  // Refs và measurements cho cột hàng chục
  const firstListRef = useRef<HTMLUListElement>(null);
  const firstListRect = useClientRect(firstListRef);
  const firstListHeight = firstListRect?.height ?? 0;

  // Refs và measurements cho cột hàng đơn vị
  const secondListRef = useRef<HTMLUListElement>(null);
  const secondListRect = useClientRect(secondListRef);
  const secondListHeight = secondListRect?.height ?? 0;

  // Animation controls từ Framer Motion
  const [scopeFirst, animateFirst] = useAnimate();
  const [scopeSecond, animateSecond] = useAnimate();

  useEffect(() => {
    if (!firstListHeight || !secondListHeight) return;

    const runCounterAnimation = async () => {
      // Lặp từ 0 đến 99 để tạo hiệu ứng đếm
      for (let i = 0; i <= 99; i++) {
        // Tách số thành hàng chục và hàng đơn vị
        const firstDigit = Math.floor(i / 10); // Ví dụ: 45 -> 4
        const secondDigit = i % 10; // Ví dụ: 45 -> 5

        // Tính toán vị trí Y cho mỗi chữ số
        // Công thức: (chiều cao danh sách / số lượng chữ số) * vị trí chữ số * -1
        // Nhân -1 để di chuyển lên trên (vì translateY âm sẽ di chuyển lên)
        const firstPosition =
          (firstListHeight / firstLetters.length) * firstDigit * -1;
        const secondPosition =
          (secondListHeight / secondLetters.length) * secondDigit * -1;

        // Animate cả hai cột cùng lúc đến vị trí mới
        await Promise.all([
          animateFirst(
            scopeFirst.current,
            { translateY: firstPosition },
            { duration: 0.05, ease: "linear" }, // Duration ngắn để animation nhanh
          ),
          animateSecond(
            scopeSecond.current,
            { translateY: secondPosition },
            { duration: 0.05, ease: "linear" }, // Duration ngắn để animation nhanh
          ),
        ]);

        // Cập nhật số hiện tại (có thể dùng để debug)
        setCurrentNumber(i);

        // Thêm delay nhỏ giữa các số để tạo cảm giác đếm
        // Delay 20ms giúp animation chạy nhanh nhưng vẫn mượt
        await new Promise((resolve) => setTimeout(resolve, 20));
      }

      // Animation kết thúc: di chuyển cả hai cột ra khỏi màn hình
      await Promise.all([
        animateFirst(
          scopeFirst.current,
          { translateY: -firstListHeight },
          { duration: 0.5, ease: "easeInOut" }, // Animation exit mượt mà hơn
        ),
        animateSecond(
          scopeSecond.current,
          { translateY: -secondListHeight },
          { duration: 0.5, ease: "easeInOut" }, // Animation exit mượt mà hơn
        ),
      ]);

      // Thông báo cho component cha biết animation đã hoàn thành
      onComplete();
    };

    runCounterAnimation();
  }, [firstListHeight, secondListHeight]);

  return (
    <div className="flex size-full items-center justify-center bg-[var(--foreground)]">
      {/* Container chứa hai cột số */}
      <div className="relative flex h-[10.5rem] justify-center gap-1 overflow-hidden">
        {/* Cột hàng chục */}
        <div ref={scopeFirst}>
          <ul ref={firstListRef} className="flex h-fit flex-col text-white">
            {firstLetters.map((letter, index) => (
              <li
                key={index}
                className="text-[12rem] leading-[0.9] text-white drop-shadow-[0px_0px_-233px_rgba(255,247,0,0.5)]"
              >
                {letter}
              </li>
            ))}
          </ul>
        </div>
        {/* Cột hàng đơn vị */}
        <div ref={scopeSecond}>
          <ul ref={secondListRef} className="flex h-fit flex-col text-white">
            {secondLetters.map((letter, index) => (
              <li
                key={index}
                className="text-[12rem] leading-[0.9] text-white drop-shadow-[0px_0px_-233px_rgba(255,247,0,0.5)]"
              >
                {letter}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CounterAnimation;

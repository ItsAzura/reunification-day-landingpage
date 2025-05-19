import React from "react";
import Su30Image from "@/public/assets/images/weapon/su30.png";

type Props = {
  className?: string;
};

function Su30Object({ className }: Props) {
  return (
    <div
      style={{
        WebkitMaskImage: `url(${Su30Image.src})`,
        maskImage: `url(${Su30Image.src})`,
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
      className={`aspect-3/2 w-[160px] bg-black/80 ${className}`}
    />
  );
}

export default Su30Object;

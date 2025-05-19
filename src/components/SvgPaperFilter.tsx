import React from "react";

type Props = {
  id: string;
  backgroundColor?: string;
};

function SvgPaperFilter({ id, backgroundColor = "#fff" }: Props) {
  return (
    <svg>
      <filter id={id}>
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.04"
          result="noise"
          numOctaves="5"
        />

        <feDiffuseLighting
          in="noise"
          lightingColor={backgroundColor}
          surfaceScale="2"
        >
          <feDistantLight azimuth="45" elevation="60" />
        </feDiffuseLighting>
      </filter>
    </svg>
  );
}

export default SvgPaperFilter;

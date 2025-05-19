import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const BlurRevealText = ({ text }: { text: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "end 0.25"],
  });

  const words = text.split(" ");

  return (
    <motion.div
      ref={ref}
      className="flex w-[70vw] max-w-[1000px] min-w-[300px] flex-wrap text-[clamp(1.5rem,5vw,3rem)] leading-[1.2] text-white"
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word
            word={word}
            progress={scrollYProgress}
            range={[start, end]}
            key={i}
          />
        );
      })}
    </motion.div>
  );
};

const Word = ({
  word,
  range,
  progress,
}: {
  word: string;
  progress: MotionValue<number>;
  range: number[];
}) => {
  const chars = word.split("");
  const amount = range[1] - range[0];
  const step = amount / word.length;

  return (
    <div className="mr-3 tracking-tight">
      {chars.map((char, i) => {
        const start = range[0] + i * step;
        const end = range[0] + step * (i + 1);
        return (
          <Character key={i} range={[start, end]} progress={progress}>
            {char}
          </Character>
        );
      })}
    </div>
  );
};

const Character = ({
  children,
  progress,
  range,
}: {
  children: any;
  progress: MotionValue<number>;
  range: number[];
}) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return <motion.span style={{ opacity }}>{children}</motion.span>;
};

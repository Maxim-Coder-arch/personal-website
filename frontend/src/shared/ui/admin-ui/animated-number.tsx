"use client";

import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

type AnimatedNumberProps = {
  value: number;
  format: (value: number) => string;
  className?: string;
};

export function AnimatedNumber({ value, format, className }: AnimatedNumberProps) {
  const motionValue = useMotionValue(0);
  const text = useTransform(motionValue, format);

  useEffect(() => {
    const controls = animate(motionValue, value, { duration: 0.9, ease: "easeOut" });
    return () => controls.stop();
  }, [motionValue, value]);

  return <motion.span className={className}>{text}</motion.span>;
}
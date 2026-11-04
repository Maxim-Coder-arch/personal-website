"use client";

import { useRef } from "react";
import { useMotionValue, useReducedMotion, useScroll } from "framer-motion";

export const useClosingSection = () => {
    const ref = useRef<HTMLHeadingElement>(null);
    const shouldReduceMotion = useReducedMotion() ?? false;

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.85", "end 0.5"],
    });

    const lit = useMotionValue(1);

    return {
        ref,
        progress: shouldReduceMotion ? lit : scrollYProgress,
    };
};
"use client";

import { useRef } from "react";
import { useReducedMotion, useScroll } from "framer-motion";

import { useMediaQuery } from "@/src/shared/lib/hooks/use-media-query";

import { STACK } from "../../model/config";

export const useShowcaseScroll = () => {
    const ref = useRef<HTMLElement>(null);
    const shouldReduceMotion = useReducedMotion() ?? false;
    const stacked = useMediaQuery(STACK.query);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    return {
        ref,
        progress: scrollYProgress,
        stacked,
        shouldReduceMotion,
    };
};
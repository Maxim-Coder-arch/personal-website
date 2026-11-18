import type { MotionProps, Variants } from "framer-motion";

import type { NodeMotionCustom } from "./types";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const getPanelMotion = (reduceMotion: boolean): MotionProps => ({
    initial: { opacity: 0, scale: reduceMotion ? 1 : 0.6 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, delay: 0.3, ease: EASE_OUT },
    },
    exit: {
        opacity: 0,
        scale: reduceMotion ? 1 : 0.6,
        transition: { duration: 0.25, ease: "easeIn" },
    },
});

export const getNodeVariants = (reduceMotion: boolean): Variants => ({
    closed: ({ x, y }: NodeMotionCustom) => ({
        x: reduceMotion ? x : 0,
        y: reduceMotion ? y : 0,
        opacity: 0,
        scale: reduceMotion ? 1 : 0.3,
        transition: { duration: reduceMotion ? 0.1 : 0.2, ease: "easeIn" },
    }),
    open: ({ x, y, index }: NodeMotionCustom) => ({
        x,
        y,
        opacity: 1,
        scale: 1,
        transition: reduceMotion
            ? { duration: 0.1 }
            : { type: "spring", stiffness: 260, damping: 22, delay: index * 0.045 },
    }),
});
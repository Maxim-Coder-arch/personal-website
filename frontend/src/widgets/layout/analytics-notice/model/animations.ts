import type { MotionProps } from "framer-motion";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const getCardMotion = (reduceMotion: boolean): MotionProps => ({
    initial: {
        opacity: 0,
        y: reduceMotion ? 0 : 28,
        scale: reduceMotion ? 1 : 0.97,
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.55, delay: 0.7, ease: EASE_OUT },
    },
    exit: {
        opacity: 0,
        y: reduceMotion ? 0 : 16,
        transition: { duration: 0.25, ease: "easeIn" },
    },
});

export const DETAILS_MOTION: MotionProps = {
    initial: { height: 0, opacity: 0 },
    animate: { height: "auto", opacity: 1, transition: { duration: 0.35, ease: EASE_OUT } },
    exit: { height: 0, opacity: 0, transition: { duration: 0.25, ease: "easeIn" } },
};
import type { Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;

export const HERO_VARIANTS: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12 },
    },
};

export const FADE_VARIANTS: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, ease: EASE },
    },
};

export const LINE_VARIANTS: Variants = {
    hidden: { y: "110%" },
    visible: {
        y: "0%",
        transition: { duration: 1.1, ease: EASE },
    },
};

export const BAR_VARIANTS: Variants = {
    hidden: { scaleX: 0 },
    visible: {
        scaleX: 1,
        transition: { duration: 1.1, ease: EASE_IN_OUT, delay: 0.5 },
    },
};

export const WORDMARK_VARIANTS: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.035 },
    },
};

export const LETTER_VARIANTS: Variants = {
    hidden: { opacity: 0, y: "40%" },
    visible: {
        opacity: 1,
        y: "0%",
        transition: { duration: 1, ease: EASE },
    },
};
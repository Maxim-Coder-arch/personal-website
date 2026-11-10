import type { Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;

export const SCENE_VARIANTS: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.15,
        },
    },
};

export const DIGIT_VARIANTS: Variants = {
    hidden: { y: "110%" },
    visible: (index: number) => ({
        y: "0%",
        transition: { duration: 1.1, ease: EASE, delay: index * 0.14 },
    }),
};

export const LENS_VARIANTS: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: { duration: 1.2, ease: EASE, delay: 0.5 },
    },
};

export const FADE_VARIANTS: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, ease: EASE, delay: 0.7 },
    },
};

export const CURTAIN_VARIANTS: Variants = {
    hidden: { clipPath: "inset(100% 0% 0% 0%)" },
    visible: {
        clipPath: "inset(0% 0% 0% 0%)",
        transition: { duration: 0.7, ease: EASE_IN_OUT },
    },
};

export const PULSE_TRANSITION = { duration: 1.1, ease: EASE };
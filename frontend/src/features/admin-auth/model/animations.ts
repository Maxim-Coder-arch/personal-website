import type { Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export const FORM_VARIANTS: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
};

export const FADE_VARIANTS: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: EASE },
    },
};

export const SHAKE = {
    x: [0, -10, 10, -6, 6, 0],
    transition: { duration: 0.45 },
};
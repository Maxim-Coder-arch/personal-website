import type { Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;

export const HERO_IDENTITY_VARIANTS: Variants = {
    hidden: {},
    visible: {},
};

export const HERO_EYEBROW_VARIANTS: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, delay: 0.05, ease: EASE },
    },
};

export const HERO_DOT_VARIANTS: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 420,
            damping: 16,
            delay: 1.05,
        },
    },
};

export const HERO_IMAGE_VARIANTS: Variants = {
    hidden: { clipPath: "inset(100% 0% 0% 0%)" },
    visible: {
        clipPath: "inset(0% 0% 0% 0%)",
        transition: { duration: 1.2, delay: 0.3, ease: EASE_IN_OUT },
    },
};

export const HERO_IMAGE_SCALE_VARIANTS: Variants = {
    hidden: { scale: 1.25 },
    visible: {
        scale: 1,
        transition: { duration: 1.6, delay: 0.3, ease: EASE },
    },
};

export const HERO_BACKGROUND_VARIANTS: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12 },
    },
};

export const HERO_BACKGROUND_ROW_VARIANTS: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 1.4, ease: EASE },
    },
};
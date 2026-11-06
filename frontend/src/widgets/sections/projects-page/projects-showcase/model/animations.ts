import type { Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;

export const SLAB_VIEWPORT = { once: true, amount: 0.3 } as const;

export const SLAB_CARD_VARIANTS: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.09,
            delayChildren: 0.1,
        },
    },
};

export const MEDIA_VARIANTS: Variants = {
    hidden: { clipPath: "inset(100% 0% 0% 0% round 24px)" },
    visible: {
        clipPath: "inset(0% 0% 0% 0% round 24px)",
        transition: { duration: 1.25, ease: EASE_IN_OUT },
    },
};

export const MEDIA_IMAGE_VARIANTS: Variants = {
    hidden: { scale: 1.25 },
    visible: {
        scale: 1,
        transition: { duration: 1.6, ease: EASE },
    },
};

export const INDEX_VARIANTS: Variants = {
    hidden: (direction: number) => ({ opacity: 0, x: 80 * direction }),
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 1.4, ease: EASE },
    },
};

export const FADE_UP_VARIANTS: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, ease: EASE },
    },
};

export const DOT_VARIANTS: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 420,
            damping: 16,
            delay: 0.5,
        },
    },
};

export const SPECS_LIST_VARIANTS: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.15,
        },
    },
};

export const SPEC_ROW_VARIANTS: Variants = {
    hidden: { opacity: 0, x: -18 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: EASE },
    },
};
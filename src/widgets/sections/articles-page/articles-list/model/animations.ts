import type { Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export const LIST_VIEWPORT = {
    once: true,
    amount: 0.1,
} as const;

export const LIST_VARIANTS: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.09,
        },
    },
};

export const ITEM_VARIANTS: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: EASE },
    },
};
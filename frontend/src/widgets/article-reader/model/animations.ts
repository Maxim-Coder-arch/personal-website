import type { Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export const PANEL_VARIANTS: Variants = {
    hidden: { opacity: 0, y: 48, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.55, ease: EASE },
    },
    exit: {
        opacity: 0,
        y: 32,
        scale: 0.98,
        transition: { duration: 0.3, ease: EASE },
    },
};

export const REDUCED_PANEL_VARIANTS: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.15 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
};
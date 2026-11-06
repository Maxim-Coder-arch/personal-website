import type { Variants } from "framer-motion";

const SPLIT_EASE = [0.22, 1, 0.36, 1] as const;

export const splitContainerVariants = (
    stagger: number,
    delay: number,
): Variants => ({
    hidden: {},
    visible: {
        transition: {
            staggerChildren: stagger,
            delayChildren: delay,
        },
    },
});

export const SPLIT_PIECE_VARIANTS: Variants = {
    hidden: { y: "110%" },
    visible: {
        y: "0%",
        transition: {
            duration: 0.95,
            ease: SPLIT_EASE,
        },
    },
};
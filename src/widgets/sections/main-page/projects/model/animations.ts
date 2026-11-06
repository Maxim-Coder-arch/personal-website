
import type { Variants } from "framer-motion";

export const projectsSectionAnimation: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.14,
            delayChildren: 0.08,
        },
    },
};

export const projectsHeadingAnimation: Variants = {
    hidden: {
        opacity: 0,
        y: 24,
        filter: "blur(8px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export const projectCardAnimation: Variants = {
    hidden: {
        opacity: 0,
        y: 48,
        scale: 0.97,
        filter: "blur(10px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export const projectImageAnimation: Variants = {
    hidden: {
        clipPath: "inset(100% 0% 0% 0% round 0.9rem)",
    },
    visible: {
        clipPath: "inset(0% 0% 0% 0% round 0.9rem)",
        transition: {
            duration: 1.1,
            delay: 0.15,
            ease: [0.76, 0, 0.24, 1],
        },
    },
};
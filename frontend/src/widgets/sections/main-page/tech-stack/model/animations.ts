import { Variants } from "framer-motion";

export const TECH_STACK_CONFIG = {
    grid: {
        featuredCardIds: ["1", "2", "3"],
    },

    animation: {
        cardDuration: 0.55,
        cardStagger: 0.1,
        iconDuration: 0.2,
        iconStagger: 0.045,
        cardOffsetY: 32,
        cardHoverOffsetY: -6,
        iconHoverOffsetY: -3,
        iconHoverScale: 1.1,
        initialScale: 0.98,
        iconInitialScale: 0.8,
        viewportAmount: 0.2,
        iconViewportAmount: 0.5,
    },
} as const;



const { animation } = TECH_STACK_CONFIG;

export const cardVariants: Variants = {
    hidden: {
        opacity: 0,
        y: animation.cardOffsetY,
        scale: animation.initialScale,
    },
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: animation.cardDuration,
            delay: index * animation.cardStagger,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

export const iconVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: animation.iconInitialScale,
    },
    visible: (index: number) => ({
        opacity: 1,
        scale: 1,
        transition: {
            duration: animation.iconDuration,
            delay: index * animation.iconStagger,
            ease: "easeOut",
        },
    }),
    hover: {
        scale: animation.iconHoverScale,
        y: animation.iconHoverOffsetY,
        transition: {
            duration: animation.iconDuration,
            ease: "easeOut",
        },
    },
};

import { Transition, Variants } from "framer-motion";

const premiumEase = [0.22, 1, 0.36, 1] as const;

export const menuAnimationConfig = {
    appearance: {
        initial: {
            opacity: 0,
            y: -20,
            scale: 0.96,
            filter: "blur(8px)",
        },
        animate: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                duration: 0.8,
                ease: premiumEase,
            },
        },
    },

    items: {
        hidden: {
            opacity: 0,
            y: -8,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.45,
                ease: premiumEase,
            },
        },
    } satisfies Variants,

    list: {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.07,
                delayChildren: 0.15,
            },
        },
    } satisfies Variants,

    bubble: {
        layout: {
            type: "spring",
            stiffness: 500,
            damping: 22,
            mass: 0.7,
        },
    } satisfies { layout: Transition },

    itemHover: {
        scale: 1.035,
        transition: {
            duration: 0.25,
            ease: premiumEase,
        },
    },

    itemTap: {
        scale: 0.96,
        transition: {
            duration: 0.15,
            ease: "easeOut",
        },
    },

    iconHover: {
        scale: 1.12,
        rotate: -5,
        transition: {
            duration: 0.3,
            ease: premiumEase,
        },
    },
};

export const menuColorAnimation = {
    active: {
        color: "#202020",
        transition: {
            duration: 0.25,
            ease: premiumEase,
        },
    },

    inactive: {
        color: "#e5e5e5",
        transition: {
            duration: 0.3,
            ease: premiumEase,
        },
    },
};
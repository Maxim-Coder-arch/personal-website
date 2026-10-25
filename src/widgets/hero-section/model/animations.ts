
import type { Variants } from "framer-motion";

const premiumEase = [0.22, 1, 0.36, 1] as const;


export const heroIntroVariants: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.14,
            delayChildren: 0.12,
        },
    },
};


export const heroTextVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 28,
        filter: "blur(8px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 1,
            ease: premiumEase,
        },
    },
};


export const heroDescriptionVariants: Variants = {
    hidden: {
        opacity: 0,
        x: 32,
        filter: "blur(8px)",
    },
    visible: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: {
            duration: 1.1,
            ease: premiumEase,
            delay: 0.2,
        },
    },
};


export const heroPortraitVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 1.12,
        y: 36,
        filter: "blur(12px)",
        clipPath: "inset(12% 8% 0% 8%)",
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        clipPath: "inset(0% 0% 0% 0%)",
        transition: {
            opacity: {
                duration: 0.8,
                ease: "easeOut",
            },
            scale: {
                duration: 1.6,
                ease: premiumEase,
            },
            y: {
                duration: 1.4,
                ease: premiumEase,
            },
            filter: {
                duration: 1.1,
                ease: "easeOut",
            },
            clipPath: {
                duration: 1.3,
                ease: premiumEase,
            },
        },
    },
};


export const heroTitleVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 80,
        scale: 0.94,
        filter: "blur(14px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 1.35,
            delay: 0.45,
            ease: premiumEase,
        },
    },
};


export const heroDecoratorsVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 18,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.9,
            delay: 0.9,
            ease: premiumEase,
        },
    },
};


export const heroAccentVariants: Variants = {
    hidden: {
        scaleX: 0,
        opacity: 0,
    },
    visible: {
        scaleX: 1,
        opacity: 1,
        transition: {
            duration: 1,
            delay: 0.65,
            ease: premiumEase,
        },
    },
};


export const heroButtonHover = {
    y: -5,
    scale: 1.04,
    transition: {
        duration: 0.35,
        ease: premiumEase,
    },
};

export const heroButtonTap = {
    scale: 0.96,
    transition: {
        duration: 0.15,
        ease: "easeOut",
    },
};


export const heroGithubHover = {
    y: -4,
    scale: 1.08,
    transition: {
        duration: 0.3,
        ease: premiumEase,
    },
};


export const heroArrowHover = {
    y: 5,
    transition: {
        duration: 0.3,
        ease: premiumEase,
    },
};

export const HERO_CONTENT_VARIANTS = {
    hidden: {
        opacity: 0,
        y: 35,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
};

export const HERO_IMAGE_VARIANTS = {
    hidden: {
        opacity: 0,
        scale: 1.04,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 1.2,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
};
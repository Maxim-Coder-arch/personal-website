
export const THOUGHTS_CONFIG = {
    animation: {
        heading: {
            duration: 0.7,
            offsetY: 40,
            viewportAmount: 0.3,
        },

        list: {
            duration: 0.65,
            offsetY: 30,
            stagger: 0.1,
            viewportAmount: 0.1,
        },

        hover: {
            duration: 0.3,
            arrowScale: 1.08,
            arrowRotation: 45,
        },

        easing: [0.22, 1, 0.36, 1] as const,
        once: true,
    },

    layout: {
        arrowSize: 60,
        rowMinHeight: 112,
    },
} as const;

export const itemVariants = {
    hidden: {
        opacity: 0,
        y: THOUGHTS_CONFIG.animation.list.offsetY,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: THOUGHTS_CONFIG.animation.list.duration,
            ease: THOUGHTS_CONFIG.animation.easing,
        },
    },
};

export const listVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: THOUGHTS_CONFIG.animation.list.stagger,
        },
    },
};
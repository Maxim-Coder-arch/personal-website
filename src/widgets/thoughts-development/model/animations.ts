
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
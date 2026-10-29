export const EXPERIENCE_CONFIG = {
    animation: {
        heading: {
            duration: 0.6,
            offsetY: 24,
            viewportAmount: 0.3,
        },

        cards: {
            duration: 0.65,
            offsetY: 36,
            stagger: 0.14,
            viewportAmount: 0.12,
        },

        hover: {
            offsetY: -6,
            duration: 0.25,
        },

        easing: [0.22, 1, 0.36, 1] as const,
        once: true,
    },

    labels: {
        eyebrow: "Путь в разработке",
        heading: "Experience",
        subtitle: ["От первых проектов", "к реальным задачам."],
        sectionDescription: "Опыт и развитие",
        sectionIndex: "01 — 04",
        current: "CURRENT",
        experience: "EXPERIENCE",
    },

    layout: {
        maxWidth: 1600,
        desktopColumns: 2,
        mobileColumns: 1,
    },
} as const;

export const { animation, labels } = EXPERIENCE_CONFIG;

export const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: animation.cards.stagger,
        },
    },
};

export const cardVariants = {
    hidden: {
        opacity: 0,
        y: animation.cards.offsetY,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: animation.cards.duration,
            ease: animation.easing,
        },
    },
};
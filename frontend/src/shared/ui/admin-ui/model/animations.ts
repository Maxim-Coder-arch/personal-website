export const ADMIN_UI_CONFIG = {
    card: {
        duration: 0.45,
        offsetY: 14,
    },

    number: {
        duration: 0.9,
    },

    ranked: {
        duration: 0.6,
        stagger: 0.04,
        minRatio: 0.02,
    },

    sparkline: {
        duration: 800,
        strokeWidth: 1.8,
        fillOpacity: 0.3,
    },

    pill: {
        stiffness: 500,
        damping: 38,
    },

    easing: "easeOut",
} as const;

export const PILL_TRANSITION = {
    type: "spring",
    stiffness: ADMIN_UI_CONFIG.pill.stiffness,
    damping: ADMIN_UI_CONFIG.pill.damping,
} as const;

export const getCardMotion = (delay: number) => ({
    initial: { opacity: 0, y: ADMIN_UI_CONFIG.card.offsetY },
    animate: { opacity: 1, y: 0 },
    transition: {
        duration: ADMIN_UI_CONFIG.card.duration,
        delay,
        ease: ADMIN_UI_CONFIG.easing,
    },
});

export const getRankedBarMotion = (ratio: number, index: number) => ({
    initial: { scaleX: 0 },
    animate: {
        scaleX: Math.min(1, Math.max(ADMIN_UI_CONFIG.ranked.minRatio, ratio)),
    },
    transition: {
        duration: ADMIN_UI_CONFIG.ranked.duration,
        delay: index * ADMIN_UI_CONFIG.ranked.stagger,
        ease: ADMIN_UI_CONFIG.easing,
    },
});
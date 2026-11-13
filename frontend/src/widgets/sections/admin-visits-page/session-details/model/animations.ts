export const getTimelineItemMotion = (index: number) => ({
    initial: { opacity: 0, x: 12 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.3, delay: index * 0.05, ease: "easeOut" },
} as const);
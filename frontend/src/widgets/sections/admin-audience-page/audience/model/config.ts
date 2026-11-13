export const AUDIENCE_CONFIG = {
    topCount: 8,
    listSkeletonHeight: 200,

    delays: {
        split: 0.05,
        countries: 0.1,
        regions: 0.15,
        os: 0.2,
        screens: 0.25,
        languages: 0.3,
        entries: 0.35,
        weekdays: 0.4,
    },

    split: {
        statsSkeletonHeight: 80,
        chartSkeletonHeight: 260,
        margin: { top: 4, right: 8, bottom: 0, left: -16 },
        yAxisWidth: 48,
        minTickGap: 24,
    },

    weekdays: {
        skeletonHeight: 200,
        margin: { top: 4, right: 0, bottom: 0, left: 0 },
    },
} as const;
export const BREAKDOWNS_CONFIG = {
    topCount: 7,
    listSkeletonHeight: 200,

    delays: {
        countries: 0.4,
        devices: 0.45,
        browsers: 0.45,
        referrers: 0.5,
        hours: 0.5,
    },

    donut: {
        innerRadius: 52,
        outerRadius: 76,
        paddingAngle: 3,
        skeletonHeight: 160,
    },

    hours: {
        count: 24,
        tickFontSize: 11,
        tickInterval: 2,
        skeletonHeight: 200,
        margin: { top: 4, right: 0, bottom: 0, left: 0 },
    },
} as const;
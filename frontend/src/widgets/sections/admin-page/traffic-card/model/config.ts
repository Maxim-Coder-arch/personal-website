export const TRAFFIC_CONFIG = {
    delay: 0.3,
    skeletonHeight: 320,
    gradientId: "traffic-fill",

    chart: {
        margin: { top: 8, right: 8, bottom: 0, left: -16 },
        areaStrokeWidth: 2.5,
        compareStrokeWidth: 1.5,
        areaFillOpacity: 0.35,
        yAxisWidth: 48,
        minTickGap: 24,
        activeDotRadius: 5,
    },

    pills: {
        metric: "traffic-metric-pill",
        interval: "traffic-interval-pill",
    },
} as const;
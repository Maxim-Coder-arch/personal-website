import { formatDecimal, getDelta } from "@/src/shared/lib/helpers/format-metrics";

import type { MetricConfig, MetricTrend } from "../../model/types";

export const getMetricTrend = (
    config: MetricConfig,
    current: number,
    previous: number,
): MetricTrend => {
    const delta = getDelta(current, previous);
    const sign = delta === null ? 1 : Math.sign(delta);

    const good = config.inverse ? sign < 0 : sign > 0;
    const bad = config.inverse ? sign > 0 : sign < 0;

    return {
        direction: sign > 0 ? "up" : sign < 0 ? "down" : "flat",
        tone: good ? "good" : bad ? "bad" : "neutral",
        text: delta === null ? "новое" : `${delta > 0 ? "+" : ""}${formatDecimal(delta)}%`,
    };
};
"use client";

import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

import { AdminCard, AnimatedNumber, Sparkline } from "@/src/shared/ui/admin-ui";

import { getMetricTrend } from "../../../lib/helpers/get-metric-trend";
import { METRICS_GRID_CONFIG } from "../../../model/config";
import type { MetricCardProps } from "../../../model/types";

import styles from "../../styles/admin-metrics-grid.module.scss";

const TREND_ICONS = {
    up: ArrowUpRight,
    down: ArrowDownRight,
    flat: Minus,
} as const;

export const MetricCard = ({ config, current, previous, series, index }: MetricCardProps) => {
    const trend = getMetricTrend(config, current, previous);
    const Icon = TREND_ICONS[trend.direction];

    const deltaClass = [
        styles["delta"],
        trend.tone === "good" ? styles["delta--up"] : "",
        trend.tone === "bad" ? styles["delta--down"] : "",
    ].join(" ");

    return (
        <AdminCard compact delay={index * METRICS_GRID_CONFIG.cardStagger}>
            <div className={styles["metric"]}>
                <span className={styles["metric__label"]}>{config.label}</span>

                <AnimatedNumber
                    className={styles["metric__value"]}
                    value={current}
                    format={config.format}
                />

                <span className={deltaClass}>
                    <Icon size={14} />
                    {trend.text}
                </span>

                {series && series.length >= METRICS_GRID_CONFIG.sparklineMinPoints && (
                    <div className={styles["metric__spark"]}>
                        <Sparkline values={series} />
                    </div>
                )}
            </div>
        </AdminCard>
    );
};
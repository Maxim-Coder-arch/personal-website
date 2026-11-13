"use client";

import {
    Area,
    CartesianGrid,
    ComposedChart,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import { ADMIN_COLORS } from "@/src/shared/config/admin-colors";
import {
    CHART_ANIMATION_DURATION,
    CHART_CURSOR_LINE,
    CHART_TICK,
} from "@/src/shared/config/admin-chart";

import { TRAFFIC_CONFIG } from "../../../model/config";
import type { TrafficChartProps } from "../../../model/types";

import { TrafficTooltip } from "./traffic-tooltip";

import styles from "../../styles/admin-traffic-card.module.scss";

const { chart, gradientId } = TRAFFIC_CONFIG;

export const TrafficChart = ({ rows, compare, metricLabel }: TrafficChartProps) => {
    return (
        <div className={styles["chart"]}>
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={rows} margin={chart.margin}>
                    <defs>
                        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="0%"
                                stopColor={ADMIN_COLORS.accent}
                                stopOpacity={chart.areaFillOpacity}
                            />
                            <stop offset="100%" stopColor={ADMIN_COLORS.accent} stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid vertical={false} stroke={ADMIN_COLORS.grid} />
                    <XAxis
                        dataKey="label"
                        tickLine={false}
                        axisLine={false}
                        tick={CHART_TICK}
                        minTickGap={chart.minTickGap}
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        allowDecimals={false}
                        tick={CHART_TICK}
                        width={chart.yAxisWidth}
                    />
                    <Tooltip
                        content={<TrafficTooltip metricLabel={metricLabel} />}
                        cursor={CHART_CURSOR_LINE}
                    />

                    {compare && (
                        <Line
                            type="monotone"
                            dataKey="previous"
                            stroke={ADMIN_COLORS.muted}
                            strokeWidth={chart.compareStrokeWidth}
                            strokeDasharray="5 5"
                            dot={false}
                            isAnimationActive={false}
                        />
                    )}

                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke={ADMIN_COLORS.accent}
                        strokeWidth={chart.areaStrokeWidth}
                        fill={`url(#${gradientId})`}
                        dot={false}
                        activeDot={{
                            r: chart.activeDotRadius,
                            stroke: ADMIN_COLORS.accent,
                            fill: ADMIN_COLORS.bg,
                            strokeWidth: 2,
                        }}
                        animationDuration={CHART_ANIMATION_DURATION}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};
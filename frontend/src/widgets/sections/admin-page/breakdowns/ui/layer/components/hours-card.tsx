"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";

import {
    CHART_ANIMATION_DURATION,
    CHART_BAR_RADIUS,
    CHART_CURSOR_BAR,
    CHART_TICK,
    CHART_TOOLTIP_STYLE,
} from "@/src/shared/config/admin-chart";
import { ADMIN_COLORS } from "@/src/shared/config/admin-colors";
import { AdminCard, Skeleton } from "@/src/shared/ui/admin-ui";
import { QueryBoundary } from "@/src/shared/ui/query-boundary";

import { useHoursChart } from "../../../lib/hooks/use-hours-chart";
import { BREAKDOWNS_CONFIG } from "../../../model/config";

import styles from "../../styles/admin-breakdowns.module.scss";

const { hours } = BREAKDOWNS_CONFIG;

const HOURS_TICK = { ...CHART_TICK, fontSize: hours.tickFontSize };

export const HoursCard = () => {
    const { query, rows } = useHoursChart();

    return (
        <AdminCard title="Активность по часам" delay={BREAKDOWNS_CONFIG.delays.hours}>
            <QueryBoundary
                query={query}
                loadingFallback={<Skeleton height={hours.skeletonHeight} />}
            >
                {() => (
                    <div className={styles["hours"]}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={rows} margin={hours.margin}>
                                <CartesianGrid vertical={false} stroke={ADMIN_COLORS.grid} />
                                <XAxis
                                    dataKey="label"
                                    tickLine={false}
                                    axisLine={false}
                                    tick={HOURS_TICK}
                                    interval={hours.tickInterval}
                                />
                                <Tooltip
                                    cursor={CHART_CURSOR_BAR}
                                    contentStyle={CHART_TOOLTIP_STYLE}
                                    labelFormatter={(label) => `${label}:00`}
                                    formatter={(value) => [value, "Сессии"]}
                                />
                                <Bar
                                    dataKey="sessions"
                                    fill={ADMIN_COLORS.accent}
                                    radius={CHART_BAR_RADIUS}
                                    animationDuration={CHART_ANIMATION_DURATION}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </QueryBoundary>
        </AdminCard>
    );
};
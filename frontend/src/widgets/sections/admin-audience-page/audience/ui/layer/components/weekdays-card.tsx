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

import { useWeekdaysChart } from "../../../lib/hooks/use-weekdays-chart";
import { AUDIENCE_CONFIG } from "../../../model/config";

import styles from "../../styles/admin-audience.module.scss";

const { weekdays } = AUDIENCE_CONFIG;

export const WeekdaysCard = () => {
    const { query, rows } = useWeekdaysChart();

    return (
        <AdminCard title="Дни недели" delay={AUDIENCE_CONFIG.delays.weekdays}>
            <QueryBoundary
                query={query}
                loadingFallback={<Skeleton height={weekdays.skeletonHeight} />}
            >
                {() => (
                    <div className={styles["weekdays"]}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={rows} margin={weekdays.margin}>
                                <CartesianGrid vertical={false} stroke={ADMIN_COLORS.grid} />
                                <XAxis
                                    dataKey="label"
                                    tickLine={false}
                                    axisLine={false}
                                    tick={CHART_TICK}
                                />
                                <Tooltip
                                    cursor={CHART_CURSOR_BAR}
                                    contentStyle={CHART_TOOLTIP_STYLE}
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
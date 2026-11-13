"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { useSummary, useTimeseries } from "@/src/entities/api/analytics/analytics-queries";
import { useDateRange } from "@/src/features/date-range";
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

import { getShare } from "../../../lib/helpers/get-share";
import { AUDIENCE_CONFIG } from "../../../model/config";
import { SEGMENT_COLORS } from "../../../model/data";

import { VisitorsStat } from "./visitors-stat";

import styles from "../../styles/admin-audience.module.scss";

const { split } = AUDIENCE_CONFIG;

export const VisitorsSplitCard = () => {
    const { range } = useDateRange();
    const summary = useSummary(range);
    const series = useTimeseries(range);

    return (
        <AdminCard title="Новые и вернувшиеся" delay={AUDIENCE_CONFIG.delays.split}>
            <QueryBoundary
                query={summary}
                loadingFallback={<Skeleton height={split.statsSkeletonHeight} />}
            >
                {(data) => {
                    const { newVisitors, returningVisitors } = data.current;
                    const total = newVisitors + returningVisitors;

                    return (
                        <div className={styles["stats"]}>
                            <VisitorsStat
                                label="Новые"
                                color={SEGMENT_COLORS.newVisitors}
                                value={newVisitors}
                                share={getShare(newVisitors, total)}
                            />
                            <VisitorsStat
                                label="Вернувшиеся"
                                color={SEGMENT_COLORS.returningVisitors}
                                value={returningVisitors}
                                share={getShare(returningVisitors, total)}
                            />
                        </div>
                    );
                }}
            </QueryBoundary>

            <QueryBoundary
                query={series}
                loadingFallback={<Skeleton height={split.chartSkeletonHeight} />}
            >
                {(data) => (
                    <div className={styles["chart"]}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.points} margin={split.margin}>
                                <CartesianGrid vertical={false} stroke={ADMIN_COLORS.grid} />
                                <XAxis
                                    dataKey="label"
                                    tickLine={false}
                                    axisLine={false}
                                    tick={CHART_TICK}
                                    minTickGap={split.minTickGap}
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    allowDecimals={false}
                                    tick={CHART_TICK}
                                    width={split.yAxisWidth}
                                />
                                <Tooltip
                                    cursor={CHART_CURSOR_BAR}
                                    contentStyle={CHART_TOOLTIP_STYLE}
                                />
                                <Bar
                                    name="Новые"
                                    dataKey="newVisitors"
                                    stackId="visitors"
                                    fill={SEGMENT_COLORS.newVisitors}
                                    animationDuration={CHART_ANIMATION_DURATION}
                                />
                                <Bar
                                    name="Вернувшиеся"
                                    dataKey="returningVisitors"
                                    stackId="visitors"
                                    fill={SEGMENT_COLORS.returningVisitors}
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
"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import { useBreakdown } from "@/src/entities/api/analytics/analytics-queries";
import { useDateRange } from "@/src/features/date-range";
import { CHART_ANIMATION_DURATION } from "@/src/shared/config/admin-chart";
import { formatPercent } from "@/src/shared/lib/helpers/format-metrics";
import { AdminCard, Skeleton } from "@/src/shared/ui/admin-ui";
import { QueryBoundary } from "@/src/shared/ui/query-boundary";

import { BREAKDOWNS_CONFIG } from "../../../model/config";
import { DEVICE_LABELS, translateKey } from "@/src/shared/lib/helpers/analytics-labels";

import { DEVICE_COLORS } from "../../../model/data";

import styles from "../../styles/admin-breakdowns.module.scss";

const { donut } = BREAKDOWNS_CONFIG;

export const DevicesCard = () => {
    const { range } = useDateRange();
    const query = useBreakdown(range, "device");

    return (
        <AdminCard title="Устройства" delay={BREAKDOWNS_CONFIG.delays.devices}>
            <QueryBoundary
                query={query}
                loadingFallback={<Skeleton height={donut.skeletonHeight} />}
            >
                {(data) => (
                    <div className={styles["donut"]}>
                        <div className={styles["donut__chart"]}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data}
                                        dataKey="visitors"
                                        nameKey="key"
                                        innerRadius={donut.innerRadius}
                                        outerRadius={donut.outerRadius}
                                        paddingAngle={donut.paddingAngle}
                                        stroke="none"
                                        animationDuration={CHART_ANIMATION_DURATION}
                                    >
                                        {data.map((item, index) => (
                                            <Cell
                                                key={item.key}
                                                fill={DEVICE_COLORS[index % DEVICE_COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className={styles["legend"]}>
                            {data.map((item, index) => (
                                <div key={item.key} className={styles["legend__row"]}>
                                    <span
                                        className={styles["legend__dot"]}
                                        style={{
                                            background: DEVICE_COLORS[index % DEVICE_COLORS.length],
                                        }}
                                    />
                                    {translateKey(item.key, DEVICE_LABELS)}
                                    <span className={styles["legend__value"]}>
                                        {formatPercent(item.share)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </QueryBoundary>
        </AdminCard>
    );
};
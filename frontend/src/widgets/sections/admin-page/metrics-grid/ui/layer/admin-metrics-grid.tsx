"use client";

import { useSummary, useTimeseries } from "@/src/entities/api/analytics/analytics-queries";
import { useDateRange } from "@/src/features/date-range";
import { QueryBoundary } from "@/src/shared/ui/query-boundary";

import { METRICS } from "../../model/data";

import { MetricCard } from "./components/metric-card";
import { MetricsGridLayout } from "./components/metrics-grid-layout";
import { MetricsSkeleton } from "./components/metrics-skeleton";

export const AdminMetricsGrid = () => {
    const { range } = useDateRange();
    const summary = useSummary(range);
    const timeseries = useTimeseries(range);

    return (
        <QueryBoundary query={summary} loadingFallback={<MetricsSkeleton />}>
            {(data) => (
                <MetricsGridLayout>
                    {METRICS.map((config, index) => (
                        <MetricCard
                            key={config.id}
                            config={config}
                            current={config.value(data.current)}
                            previous={config.value(data.previous)}
                            series={
                                config.series && timeseries.data
                                    ? timeseries.data.points.map(config.series)
                                    : undefined
                            }
                            index={index}
                        />
                    ))}
                </MetricsGridLayout>
            )}
        </QueryBoundary>
    );
};
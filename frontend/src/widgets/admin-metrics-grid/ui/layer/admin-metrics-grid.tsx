"use client";

import { useSummary, useTimeseries } from "@/src/entities/api/analytics/analytics-queries";
import { useDateRange } from "@/src/features/date-range";
import { QueryBoundary } from "@/src/shared/ui/query-boundary";
import { METRICS } from "../../model/data";
import { MetricCard } from "./components/metric-card";
import { MetricsSkeleton } from "./components/metrics-skeleton";
import styles from "../styles/admin-metrics-grid.module.scss";

export function AdminMetricsGrid() {
  const { range } = useDateRange();
  const summary = useSummary(range);
  const timeseries = useTimeseries(range);

  return (
    <QueryBoundary query={summary} loadingFallback={<MetricsSkeleton />}>
      {(data) => (
        <div className={styles["grid"]}>
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
        </div>
      )}
    </QueryBoundary>
  );
}
"use client";

import { useMemo, useState } from "react";
import { useTimeseries } from "@/src/entities/api/analytics/analytics-queries";
import type { Interval } from "@/src/entities/api/analytics/types";
import { useDateRange } from "@/src/features/date-range";
import { AdminCard, Segmented, Skeleton } from "@/src/shared/ui/admin-ui";
import { QueryBoundary } from "@/src/shared/ui/query-boundary";
import { TRAFFIC_INTERVALS, TRAFFIC_METRICS } from "../../model/data";
import type { TrafficInterval, TrafficMetric, TrafficRow } from "../../model/types";
import { TrafficChart } from "./components/traffic-chart";
import styles from "../styles/admin-traffic-card.module.scss";

export function AdminTrafficCard() {
  const { range, previous } = useDateRange();
  const [metric, setMetric] = useState<TrafficMetric>("visitors");
  const [intervalId, setIntervalId] = useState<TrafficInterval>("auto");
  const [compare, setCompare] = useState(false);

  const main = useTimeseries(range, intervalId === "auto" ? undefined : intervalId);
  const resolvedInterval = main.data?.interval as Interval | undefined;
  const compared = useTimeseries(previous, resolvedInterval, compare && !!resolvedInterval);

  const rows = useMemo<TrafficRow[]>(() => {
    if (!main.data) return [];
    return main.data.points.map((point, index) => {
      const other = compare ? compared.data?.points[index] : undefined;
      return {
        label: point.label,
        value: point[metric],
        previous: other ? other[metric] : undefined,
        previousLabel: other?.label,
      };
    });
  }, [main.data, compared.data, metric, compare]);

  const metricLabel = TRAFFIC_METRICS.find((item) => item.id === metric)!.label;

  return (
    <AdminCard
      title="Динамика"
      delay={0.3}
      action={
        <div className={styles["controls"]}>
          <Segmented
            options={TRAFFIC_METRICS}
            value={metric}
            onChange={setMetric}
            layoutId="traffic-metric-pill"
          />
          <Segmented
            options={TRAFFIC_INTERVALS}
            value={intervalId}
            onChange={setIntervalId}
            layoutId="traffic-interval-pill"
          />
          <button
            type="button"
            className={[styles["compare"], compare ? styles["compare--on"] : ""].join(" ")}
            onClick={() => setCompare((value) => !value)}
          >
            Сравнить
          </button>
        </div>
      }
    >
      <QueryBoundary query={main} loadingFallback={<Skeleton height={320} />}>
        {() => <TrafficChart rows={rows} compare={compare} metricLabel={metricLabel} />}
      </QueryBoundary>
    </AdminCard>
  );
}
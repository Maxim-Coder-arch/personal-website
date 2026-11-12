import type { SummaryMetrics, TimeseriesPoint } from "@/src/entities/api/analytics/types";

export type MetricConfig = {
  id: string;
  label: string;
  value: (metrics: SummaryMetrics) => number;
  format: (value: number) => string;
  series?: (point: TimeseriesPoint) => number;
  inverse?: boolean;
};
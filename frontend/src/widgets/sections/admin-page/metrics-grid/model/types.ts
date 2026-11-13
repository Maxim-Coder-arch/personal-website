import type { SummaryMetrics, TimeseriesPoint } from "@/src/entities/api/analytics/types";

export type MetricConfig = {
  id: string;
  label: string;
  value: (metrics: SummaryMetrics) => number;
  format: (value: number) => string;
  series?: (point: TimeseriesPoint) => number;
  inverse?: boolean;
};

export interface MetricCardProps {
    config: MetricConfig;
    current: number;
    previous: number;
    series?: number[];
    index: number;
}

export interface MetricTrend {
    direction: "up" | "down" | "flat";
    tone: "good" | "bad" | "neutral";
    text: string;
}
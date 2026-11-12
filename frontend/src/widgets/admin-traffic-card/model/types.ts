import type { Interval } from "@/src/entities/api/analytics/types";

export type TrafficMetric = "visitors" | "sessions" | "pageViews";

export type TrafficInterval = "auto" | Interval;

export type TrafficRow = {
  label: string;
  value: number;
  previous?: number;
  previousLabel?: string;
};
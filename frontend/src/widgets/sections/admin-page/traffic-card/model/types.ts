import { ReactNode } from "react";

import type { Interval } from "@/src/entities/api/analytics/types";

export type TrafficMetric = "visitors" | "sessions" | "pageViews";

export type TrafficInterval = "auto" | Interval;

export type TrafficRow = {
  label: string;
  value: number;
  previous?: number;
  previousLabel?: string;
};

export interface TrafficLayoutProps {
    controls: ReactNode;
    children: ReactNode;
}

export interface TrafficControlsProps {
    metric: TrafficMetric;
    onMetricChange: (id: TrafficMetric) => void;
    interval: TrafficInterval;
    onIntervalChange: (id: TrafficInterval) => void;
    compare: boolean;
    onCompareToggle: () => void;
}

export interface TrafficChartProps {
    rows: TrafficRow[];
    compare: boolean;
    metricLabel: string;
}

export interface TrafficTooltipProps {
    active?: boolean;
    payload?: ReadonlyArray<{ payload: TrafficRow }>;
    metricLabel: string;
}
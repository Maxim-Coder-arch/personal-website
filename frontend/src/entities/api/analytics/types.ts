export type DateRange = {
  from: string;
  to: string;
};

export type Interval = "hour" | "day" | "week" | "month" | "year";

export type SummaryMetrics = {
  visitors: number;
  newVisitors: number;
  returningVisitors: number;
  sessions: number;
  pageViews: number;
  pageViewsPerSession: number;
  avgSessionSeconds: number;
  bounceRate: number;
};

export type SummaryResponse = {
  from: string;
  to: string;
  timeZone: string;
  current: SummaryMetrics;
  previous: SummaryMetrics;
};

export type TimeseriesPoint = {
  start: string;
  label: string;
  visitors: number;
  newVisitors: number;
  returningVisitors: number;
  sessions: number;
  pageViews: number;
  avgSessionSeconds: number;
};

export type TimeseriesResponse = {
  interval: Interval;
  timeZone: string;
  points: TimeseriesPoint[];
};
import {
  formatDecimal,
  formatDuration,
  formatNumber,
  formatPercent,
} from "@/src/shared/lib/helpers/format-metrics";
import type { MetricConfig } from "./types";

export const METRICS: MetricConfig[] = [
  {
    id: "visitors",
    label: "Посетители",
    value: (metrics) => metrics.visitors,
    format: formatNumber,
    series: (point) => point.visitors,
  },
  {
    id: "sessions",
    label: "Сессии",
    value: (metrics) => metrics.sessions,
    format: formatNumber,
    series: (point) => point.sessions,
  },
  {
    id: "pageViews",
    label: "Просмотры",
    value: (metrics) => metrics.pageViews,
    format: formatNumber,
    series: (point) => point.pageViews,
  },
  {
    id: "depth",
    label: "Страниц за сессию",
    value: (metrics) => metrics.pageViewsPerSession,
    format: formatDecimal,
    series: (point) => (point.sessions > 0 ? point.pageViews / point.sessions : 0),
  },
  {
    id: "duration",
    label: "Время на сайте",
    value: (metrics) => metrics.avgSessionSeconds,
    format: formatDuration,
    series: (point) => point.avgSessionSeconds,
  },
  {
    id: "bounce",
    label: "Отказы",
    value: (metrics) => metrics.bounceRate,
    format: formatPercent,
    inverse: true,
  },
];
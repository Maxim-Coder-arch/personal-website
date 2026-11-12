import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getBreakdown, getPages, getRealtime, getSummary, getTimeseries } from "./analytics-api";
import type { BreakdownKey, DateRange, Interval } from "./types";

export const analyticsKeys = {
  all: ["analytics"] as const,
  summary: (range: DateRange) => ["analytics", "summary", range.from, range.to] as const,
  timeseries: (range: DateRange, interval?: Interval) =>
    ["analytics", "timeseries", range.from, range.to, interval ?? "auto"] as const,
  breakdown: (range: DateRange, key: BreakdownKey) =>
    ["analytics", "breakdown", key, range.from, range.to] as const,
  pages: (range: DateRange) => ["analytics", "pages", range.from, range.to] as const,
  realtime: ["analytics", "realtime"] as const,
};

export const useSummary = (range: DateRange) =>
  useQuery({
    queryKey: analyticsKeys.summary(range),
    queryFn: () => getSummary(range),
    placeholderData: keepPreviousData,
  });

export const useTimeseries = (range: DateRange, interval?: Interval, enabled = true) =>
  useQuery({
    queryKey: analyticsKeys.timeseries(range, interval),
    queryFn: () => getTimeseries(range, interval),
    placeholderData: keepPreviousData,
    enabled,
  });

export const useBreakdown = (range: DateRange, key: BreakdownKey) =>
  useQuery({
    queryKey: analyticsKeys.breakdown(range, key),
    queryFn: () => getBreakdown(range, key),
    placeholderData: keepPreviousData,
  });

export const usePages = (range: DateRange) =>
  useQuery({
    queryKey: analyticsKeys.pages(range),
    queryFn: () => getPages(range),
    placeholderData: keepPreviousData,
  });

export const useRealtime = () =>
  useQuery({
    queryKey: analyticsKeys.realtime,
    queryFn: getRealtime,
    refetchInterval: 15000,
  });
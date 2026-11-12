import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getSummary, getTimeseries } from "./analytics-api";
import type { DateRange, Interval } from "./types";

export const analyticsKeys = {
  all: ["analytics"] as const,
  summary: (range: DateRange) => ["analytics", "summary", range.from, range.to] as const,
  timeseries: (range: DateRange, interval?: Interval) =>
    ["analytics", "timeseries", range.from, range.to, interval ?? "auto"] as const,
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
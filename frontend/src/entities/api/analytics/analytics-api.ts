import { BACKEND_PROXY } from "@/src/shared/config/api";

import type { BreakdownItem, BreakdownKey, DateRange, Interval, PageStat, RealtimeResponse, SummaryResponse, TimeseriesResponse } from "./types";

const BASE = `${BACKEND_PROXY}/api/admin/analytics`;

const getTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

async function request<T>(path: string, params: Record<string, string | undefined>): Promise<T> {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) search.set(key, value);
  });

  const response = await fetch(`${BASE}/${path}?${search.toString()}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Analytics request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const getSummary = (range: DateRange) =>
  request<SummaryResponse>("summary", { from: range.from, to: range.to, tz: getTimeZone() });

export const getTimeseries = (range: DateRange, interval?: Interval) =>
  request<TimeseriesResponse>("timeseries", {
    from: range.from,
    to: range.to,
    tz: getTimeZone(),
    interval,
  });

export const getBreakdown = (range: DateRange, key: BreakdownKey) =>
  request<BreakdownItem[]>("breakdown", {
    by: key,
    from: range.from,
    to: range.to,
    tz: getTimeZone(),
  });

export const getPages = (range: DateRange) =>
  request<PageStat[]>("pages", { from: range.from, to: range.to, tz: getTimeZone() });

export const getRealtime = () => request<RealtimeResponse>("realtime", {});
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { analyticsApi } from "./analytics-api";
import type { BreakdownKey, DateRange, Interval, SessionsQuery } from "./types";

const ROOT_KEY = ["analytics"] as const;

export const analyticsQueries = {
    key: ROOT_KEY,

    summary: (range: DateRange) => ({
        queryKey: [...ROOT_KEY, "summary", range.from, range.to] as const,
        queryFn: () => analyticsApi.getSummary(range),
    }),

    timeseries: (range: DateRange, interval?: Interval) => ({
        queryKey: [...ROOT_KEY, "timeseries", range.from, range.to, interval ?? "auto"] as const,
        queryFn: () => analyticsApi.getTimeseries(range, interval),
    }),

    breakdown: (range: DateRange, key: BreakdownKey) => ({
        queryKey: [...ROOT_KEY, "breakdown", key, range.from, range.to] as const,
        queryFn: () => analyticsApi.getBreakdown(range, key),
    }),

    pages: (range: DateRange) => ({
        queryKey: [...ROOT_KEY, "pages", range.from, range.to] as const,
        queryFn: () => analyticsApi.getPages(range),
    }),

    realtime: () => ({
        queryKey: [...ROOT_KEY, "realtime"] as const,
        queryFn: analyticsApi.getRealtime,
    }),

    sessions: (params: SessionsQuery) => ({
        queryKey: [
            ...ROOT_KEY,
            "sessions",
            params.range.from,
            params.range.to,
            params.filters.device ?? "",
            params.filters.country ?? "",
            params.filters.returning ?? "",
            params.page,
            params.pageSize,
        ] as const,
        queryFn: () => analyticsApi.getSessions(params),
    }),

    session: (id: string) => ({
        queryKey: [...ROOT_KEY, "session", id] as const,
        queryFn: () => analyticsApi.getSession(id),
    }),
};

export function useSummary(range: DateRange) {
    return useQuery({
        ...analyticsQueries.summary(range),
        placeholderData: keepPreviousData,
    });
}

export function useTimeseries(range: DateRange, interval?: Interval, enabled = true) {
    return useQuery({
        ...analyticsQueries.timeseries(range, interval),
        placeholderData: keepPreviousData,
        enabled,
    });
}

export function useBreakdown(range: DateRange, key: BreakdownKey) {
    return useQuery({
        ...analyticsQueries.breakdown(range, key),
        placeholderData: keepPreviousData,
    });
}

export function usePages(range: DateRange) {
    return useQuery({
        ...analyticsQueries.pages(range),
        placeholderData: keepPreviousData,
    });
}

export function useRealtime() {
    return useQuery({
        ...analyticsQueries.realtime(),
        refetchInterval: 15000,
    });
}

export function useSessions(params: SessionsQuery) {
    return useQuery({
        ...analyticsQueries.sessions(params),
        placeholderData: keepPreviousData,
    });
}

export function useSession(id: string | null) {
    return useQuery({
        ...analyticsQueries.session(id ?? ""),
        enabled: id !== null,
    });
}
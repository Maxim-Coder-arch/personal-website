import { BACKEND_PROXY } from "@/src/shared/config/api";

import type {
    BreakdownItem,
    BreakdownKey,
    DateRange,
    Interval,
    PageStat,
    RealtimeResponse,
    SessionDetailResponse,
    SessionListResponse,
    SessionsQuery,
    SummaryResponse,
    TimeseriesResponse,
} from "./types";

const BASE = `${BACKEND_PROXY}/api/admin/analytics`;

type RequestParams = Record<string, string | number | boolean | undefined>;

const getTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

const getRangeParams = (range: DateRange): RequestParams => ({
    from: range.from,
    to: range.to,
    tz: getTimeZone(),
});

const request = async <T>(path: string, params: RequestParams = {}): Promise<T> => {
    const search = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== "") search.set(key, String(value));
    });

    const response = await fetch(`${BASE}/${path}?${search.toString()}`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error(`Не удалось получить данные аналитики: ${response.status}`);
    }

    return response.json() as Promise<T>;
};

export const analyticsApi = {
    getSummary(range: DateRange): Promise<SummaryResponse> {
        return request("summary", getRangeParams(range));
    },

    getTimeseries(range: DateRange, interval?: Interval): Promise<TimeseriesResponse> {
        return request("timeseries", { ...getRangeParams(range), interval });
    },

    getBreakdown(range: DateRange, key: BreakdownKey): Promise<BreakdownItem[]> {
        return request("breakdown", { ...getRangeParams(range), by: key });
    },

    getPages(range: DateRange): Promise<PageStat[]> {
        return request("pages", getRangeParams(range));
    },

    getRealtime(): Promise<RealtimeResponse> {
        return request("realtime");
    },

    getSessions({ range, filters, page, pageSize }: SessionsQuery): Promise<SessionListResponse> {
        return request("sessions", {
            ...getRangeParams(range),
            device: filters.device,
            country: filters.country,
            returning: filters.returning,
            page,
            pageSize,
        });
    },

    getSession(id: string): Promise<SessionDetailResponse> {
        return request(`sessions/${id}`);
    },
};
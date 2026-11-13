"use client";

import { useMemo } from "react";

import { useBreakdown } from "@/src/entities/api/analytics/analytics-queries";
import { useDateRange } from "@/src/features/date-range";

import { WEEKDAYS } from "../../model/data";

export const useWeekdaysChart = () => {
    const { range } = useDateRange();
    const query = useBreakdown(range, "weekday");

    const rows = useMemo(() => {
        const byDay = new Map((query.data ?? []).map((item) => [item.key, item.sessions]));

        return WEEKDAYS.map((day) => ({
            label: day.label,
            sessions: byDay.get(day.key) ?? 0,
        }));
    }, [query.data]);

    return { query, rows };
};
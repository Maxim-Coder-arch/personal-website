import { useMemo } from "react";

import { useBreakdown } from "@/src/entities/api/analytics/analytics-queries";
import { useDateRange } from "@/src/features/date-range";

import { BREAKDOWNS_CONFIG } from "../../model/config";

export const useHoursChart = () => {
    const { range } = useDateRange();
    const query = useBreakdown(range, "hour");

    const rows = useMemo(() => {
        const byHour = new Map(
            (query.data ?? []).map((item) => [parseInt(item.key, 10), item.sessions]),
        );

        return Array.from({ length: BREAKDOWNS_CONFIG.hours.count }, (_, hour) => ({
            label: String(hour).padStart(2, "0"),
            sessions: byHour.get(hour) ?? 0,
        }));
    }, [query.data]);

    return { query, rows };
};
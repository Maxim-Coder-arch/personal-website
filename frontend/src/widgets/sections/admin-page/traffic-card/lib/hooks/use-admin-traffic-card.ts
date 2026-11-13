import { useMemo, useState } from "react";

import { useTimeseries } from "@/src/entities/api/analytics/analytics-queries";
import type { Interval } from "@/src/entities/api/analytics/types";
import { useDateRange } from "@/src/features/date-range";

import { TRAFFIC_METRICS } from "../../model/data";
import type { TrafficInterval, TrafficMetric, TrafficRow } from "../../model/types";

export const useAdminTrafficCard = () => {
    const { range, previous } = useDateRange();
    const [metric, setMetric] = useState<TrafficMetric>("visitors");
    const [intervalId, setIntervalId] = useState<TrafficInterval>("auto");
    const [compare, setCompare] = useState(false);

    const main = useTimeseries(range, intervalId === "auto" ? undefined : intervalId);
    const resolvedInterval = main.data?.interval as Interval | undefined;
    const compared = useTimeseries(previous, resolvedInterval, compare && !!resolvedInterval);

    const rows = useMemo<TrafficRow[]>(() => {
        if (!main.data) return [];

        return main.data.points.map((point, index) => {
            const other = compare ? compared.data?.points[index] : undefined;

            return {
                label: point.label,
                value: point[metric],
                previous: other ? other[metric] : undefined,
                previousLabel: other?.label,
            };
        });
    }, [main.data, compared.data, metric, compare]);

    const metricLabel = TRAFFIC_METRICS.find((item) => item.id === metric)!.label;

    const toggleCompare = () => setCompare((value) => !value);

    return {
        main,
        rows,
        metric,
        setMetric,
        intervalId,
        setIntervalId,
        compare,
        toggleCompare,
        metricLabel,
    };
};
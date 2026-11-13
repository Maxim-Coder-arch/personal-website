"use client";

import { Skeleton } from "@/src/shared/ui/admin-ui";
import { QueryBoundary } from "@/src/shared/ui/query-boundary";

import { useAdminTrafficCard } from "../../lib/hooks/use-admin-traffic-card";
import { TRAFFIC_CONFIG } from "../../model/config";

import { TrafficChart } from "./components/traffic-chart";
import { TrafficControls } from "./components/traffic-controls";
import { TrafficLayout } from "./components/traffic-layout";

export const AdminTrafficCard = () => {
    const {
        main,
        rows,
        metric,
        setMetric,
        intervalId,
        setIntervalId,
        compare,
        toggleCompare,
        metricLabel,
    } = useAdminTrafficCard();

    return (
        <TrafficLayout
            controls={
                <TrafficControls
                    metric={metric}
                    onMetricChange={setMetric}
                    interval={intervalId}
                    onIntervalChange={setIntervalId}
                    compare={compare}
                    onCompareToggle={toggleCompare}
                />
            }
        >
            <QueryBoundary
                query={main}
                loadingFallback={<Skeleton height={TRAFFIC_CONFIG.skeletonHeight} />}
            >
                {() => (
                    <TrafficChart rows={rows} compare={compare} metricLabel={metricLabel} />
                )}
            </QueryBoundary>
        </TrafficLayout>
    );
};
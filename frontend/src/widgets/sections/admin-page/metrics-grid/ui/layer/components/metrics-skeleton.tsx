import { Skeleton } from "@/src/shared/ui/admin-ui";

import { METRICS } from "../../../model/data";

import { MetricsGridLayout } from "./metrics-grid-layout";

import styles from "../../styles/admin-metrics-grid.module.scss";

export const MetricsSkeleton = () => {
    return (
        <MetricsGridLayout>
            {METRICS.map((metric) => (
                <div key={metric.id} className={styles["skeleton-card"]}>
                    <Skeleton width="50%" height={12} />
                    <Skeleton width="70%" height={30} />
                    <Skeleton width="35%" height={12} />
                    <Skeleton height={44} />
                </div>
            ))}
        </MetricsGridLayout>
    );
};
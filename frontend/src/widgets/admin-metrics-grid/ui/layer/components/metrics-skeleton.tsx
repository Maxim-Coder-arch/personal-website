import { Skeleton } from "@/src/shared/ui/admin-ui";
import { METRICS } from "../../../model/data";
import styles from "../../styles/admin-metrics-grid.module.scss";

export function MetricsSkeleton() {
  return (
    <div className={styles["grid"]}>
      {METRICS.map((metric) => (
        <div key={metric.id} className={styles["skeleton-card"]}>
          <Skeleton width="50%" height={12} />
          <Skeleton width="70%" height={30} />
          <Skeleton width="35%" height={12} />
          <Skeleton height={44} />
        </div>
      ))}
    </div>
  );
}
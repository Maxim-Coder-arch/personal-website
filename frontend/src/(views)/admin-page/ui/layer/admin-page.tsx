import { AdminMetricsGrid } from "@/src/widgets/admin-metrics-grid";
import { AdminTrafficCard } from "@/src/widgets/admin-traffic-card";
import styles from "../styles/admin-page.module.scss";

export function AdminPage() {
  return (
    <div className={styles["page"]}>
      <AdminMetricsGrid />
      <AdminTrafficCard />
    </div>
  );
}
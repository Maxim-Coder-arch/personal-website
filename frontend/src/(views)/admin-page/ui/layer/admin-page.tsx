import { AdminBreakdowns } from "@/src/widgets/admin-breakdowns";
import { AdminMetricsGrid } from "@/src/widgets/admin-metrics-grid";
import { AdminRealtimeCard } from "@/src/widgets/admin-realtime-card";
import { AdminTopPagesCard } from "@/src/widgets/admin-top-pages-card";
import { AdminTrafficCard } from "@/src/widgets/admin-traffic-card";
import styles from "../styles/admin-page.module.scss";

export function AdminPage() {
  return (
    <div className={styles["page"]}>
      <AdminMetricsGrid />
      <AdminTrafficCard />
      <div className={styles["row"]}>
        <AdminRealtimeCard />
        <AdminTopPagesCard />
      </div>
      <AdminBreakdowns />
    </div>
  );
}
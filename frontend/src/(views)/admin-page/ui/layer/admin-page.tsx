import { AdminBreakdowns } from "@/src/widgets/sections/admin-page/breakdowns";
import { AdminMetricsGrid } from "@/src/widgets/sections/admin-page/metrics-grid";
import { AdminRealtimeCard } from "@/src/widgets/sections/admin-page/realtime-card";
import { AdminTopPagesCard } from "@/src/widgets/sections/admin-page/top-pages-card";
import { AdminTrafficCard } from "@/src/widgets/sections/admin-page/traffic-card";
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
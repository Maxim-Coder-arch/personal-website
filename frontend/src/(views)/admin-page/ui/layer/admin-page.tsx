import { AdminBreakdowns } from "@/src/widgets/sections/admin-page/breakdowns";
import { AdminMetricsGrid } from "@/src/widgets/sections/admin-page/metrics-grid";
import { AdminRealtimeCard } from "@/src/widgets/sections/admin-page/realtime-card";
import { AdminTopPagesCard } from "@/src/widgets/sections/admin-page/top-pages-card";
import { AdminTrafficCard } from "@/src/widgets/sections/admin-page/traffic-card";

import { AdminPageLayout } from "./admin-page-layout";
import { AdminPageRow } from "./admin-page-row";

export const AdminPage = () => {
    return (
        <AdminPageLayout>
            <AdminMetricsGrid />
            <AdminTrafficCard />

            <AdminPageRow>
                <AdminRealtimeCard />
                <AdminTopPagesCard />
            </AdminPageRow>

            <AdminBreakdowns />
        </AdminPageLayout>
    );
};
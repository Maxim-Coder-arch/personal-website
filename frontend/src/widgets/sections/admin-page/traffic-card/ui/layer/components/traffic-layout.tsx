import { AdminCard } from "@/src/shared/ui/admin-ui";

import { TRAFFIC_CONFIG } from "../../../model/config";
import type { TrafficLayoutProps } from "../../../model/types";

export const TrafficLayout = ({ controls, children }: TrafficLayoutProps) => {
    return (
        <AdminCard title="Динамика" delay={TRAFFIC_CONFIG.delay} action={controls}>
            {children}
        </AdminCard>
    );
};
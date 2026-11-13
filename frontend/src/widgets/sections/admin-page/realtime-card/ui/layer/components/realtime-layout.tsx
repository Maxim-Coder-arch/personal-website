import { ReactChildren } from "@/src/shared/types/global-types";
import { AdminCard } from "@/src/shared/ui/admin-ui";

import { REALTIME_CONFIG } from "../../../model/config";

export const RealtimeLayout = ({ children }: ReactChildren) => {
    return (
        <AdminCard title="Сейчас на сайте" delay={REALTIME_CONFIG.delay}>
            {children}
        </AdminCard>
    );
};
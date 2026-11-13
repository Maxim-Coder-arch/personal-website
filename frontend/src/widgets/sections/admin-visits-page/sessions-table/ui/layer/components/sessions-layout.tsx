import { formatNumber } from "@/src/shared/lib/helpers/format-metrics";
import { AdminCard } from "@/src/shared/ui/admin-ui";

import { SESSIONS_TABLE_CONFIG } from "../../../model/config";
import type { SessionsLayoutProps } from "../../../model/types";

import styles from "../../styles/sessions-table.module.scss";

export const SessionsLayout = ({ total, children }: SessionsLayoutProps) => {
    return (
        <AdminCard
            title="Сессии"
            delay={SESSIONS_TABLE_CONFIG.delay}
            action={
                total !== undefined && (
                    <span className={styles["total"]}>{formatNumber(total)}</span>
                )
            }
        >
            {children}
        </AdminCard>
    );
};
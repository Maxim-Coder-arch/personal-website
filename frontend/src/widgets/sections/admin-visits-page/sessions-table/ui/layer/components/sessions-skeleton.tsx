import { Skeleton } from "@/src/shared/ui/admin-ui";

import { SESSIONS_TABLE_CONFIG } from "../../../model/config";

import styles from "../../styles/sessions-table.module.scss";

export const SessionsSkeleton = () => {
    return (
        <div className={styles["skeleton"]}>
            {Array.from({ length: SESSIONS_TABLE_CONFIG.skeletonRows }, (_, index) => (
                <Skeleton key={index} height={SESSIONS_TABLE_CONFIG.skeletonRowHeight} />
            ))}
        </div>
    );
};
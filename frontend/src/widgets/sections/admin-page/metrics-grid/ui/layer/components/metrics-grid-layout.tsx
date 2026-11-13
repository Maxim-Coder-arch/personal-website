import { ReactChildren } from "@/src/shared/types/global-types";

import styles from "../../styles/admin-metrics-grid.module.scss";

export const MetricsGridLayout = ({ children }: ReactChildren) => {
    return <div className={styles["grid"]}>{children}</div>;
};
import { ReactChildren } from "@/src/shared/types/global-types";

import styles from "../../styles/admin-breakdowns.module.scss";

export const BreakdownsLayout = ({ children }: ReactChildren) => {
    return <div className={styles["grid"]}>{children}</div>;
};
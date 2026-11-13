import { ReactChildren } from "@/src/shared/types/global-types";

import styles from "../styles/admin-visits-page.module.scss";

export const AdminVisitsPageLayout = ({ children }: ReactChildren) => {
    return <div className={styles["admin-visits-page"]}>{children}</div>;
};
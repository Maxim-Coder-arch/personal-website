import { ReactChildren } from "@/src/shared/types/global-types";

import styles from "../styles/admin-projects-page.module.scss";

export const AdminProjectsPageLayout = ({ children }: ReactChildren) => {
    return <div className={styles["admin-projects-page"]}>{children}</div>;
};
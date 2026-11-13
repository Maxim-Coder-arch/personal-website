import { ReactChildren } from "@/src/shared/types/global-types";

import styles from "../styles/admin-page.module.scss";

export const AdminPageLayout = ({ children }: ReactChildren) => {
    return <div className={styles["page"]}>{children}</div>;
};
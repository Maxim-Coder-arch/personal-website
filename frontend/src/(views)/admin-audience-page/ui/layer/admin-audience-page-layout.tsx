import { ReactChildren } from "@/src/shared/types/global-types";

import styles from "../styles/admin-audience-page.module.scss";

export const AdminAudiencePageLayout = ({ children }: ReactChildren) => {
    return <div className={styles["admin-audience-page"]}>{children}</div>;
};
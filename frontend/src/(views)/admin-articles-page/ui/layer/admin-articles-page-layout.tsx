import { ReactChildren } from "@/src/shared/types/global-types";

import styles from "../styles/admin-articles-page.module.scss";

export const AdminArticlesPageLayout = ({ children }: ReactChildren) => {
    return <div className={styles["admin-articles-page"]}>{children}</div>;
};
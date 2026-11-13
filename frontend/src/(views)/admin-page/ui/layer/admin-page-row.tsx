import { ReactChildren } from "@/src/shared/types/global-types";

import styles from "../styles/admin-page.module.scss";

export const AdminPageRow = ({ children }: ReactChildren) => {
    return <div className={styles["row"]}>{children}</div>;
};
import { ReactChildren } from "@/src/shared/types/global-types";

import styles from "../styles/admin-project-editor-page.module.scss";

export const AdminProjectEditorPageLayout = ({ children }: ReactChildren) => {
    return <div className={styles["admin-project-editor-page"]}>{children}</div>;
};
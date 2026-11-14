import { ReactChildren } from "@/src/shared/types/global-types";

import styles from "../styles/admin-article-editor-page.module.scss";

export const AdminArticleEditorPageLayout = ({ children }: ReactChildren) => {
    return <div className={styles["admin-article-editor-page"]}>{children}</div>;
};
import { ReactChildren } from "@/src/shared/types/global-types";

import styles from "../../styles/article-editor.module.scss";

export const ArticleEditorLayout = ({ children }: ReactChildren) => {
    return <div className={styles["layout"]}>{children}</div>;
};
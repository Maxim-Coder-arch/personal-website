import { ReactChildren } from "@/src/shared/types/global-types";

import styles from "../../styles/project-editor.module.scss";

export const ProjectEditorLayout = ({ children }: ReactChildren) => {
    return <div className={styles["layout"]}>{children}</div>;
};
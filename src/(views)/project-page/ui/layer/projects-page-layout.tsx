import { ReactChildren } from "@/src/shared/types/global-types";

import styles from "../styles/projects-page.module.scss";

export const ProjectPageLayout = ({ children }: ReactChildren) => {
    return (
        <div className={`${styles["project-page"]} min-h-screen`}>
            { children }
        </div>
    )
}
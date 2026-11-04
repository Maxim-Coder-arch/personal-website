import { ReactChildren } from "@/src/shared/types/global-types";

import styles from "../styles/projects-page.module.scss";

export const ProjectsPageLayout = ({ children }: ReactChildren) => {
    return (
        <div className={`${styles["projects-page"]} min-h-screen`}>
            { children }
        </div>
    )
}

import { ProjectInfoProps } from "../../../model/types";

import styles from "../../styles/projects.module.scss";

export const ProjectInfo = ({
    title,
    subtitle,
    index,
}: ProjectInfoProps) => {
    const projectNumber = String(index + 1).padStart(2, "0");

    return (
        <div className={styles["projects-section__project-info"]}>
            <div className={styles["projects-section__project-title"]}>
                <h3>{title}</h3>
                <span>{subtitle}</span>
            </div>

            <span className={styles["projects-section__project-index"]}>
                PROJECT / {projectNumber}
            </span>
        </div>
    );
};

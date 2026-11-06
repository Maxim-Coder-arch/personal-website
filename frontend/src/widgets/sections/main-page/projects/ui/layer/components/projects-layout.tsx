import { ReactChildren } from "@/src/shared/types/global-types";

import styles from "../../styles/projects.module.scss";

export const ProjectsLayout = ({ children }: ReactChildren) => {
    return (
        <section
            id="projects"
            className={styles["projects-section"]}
        >
            <div className="min-h-screen px-8 py-10 flex flex-col gap-8">
                { children }
            </div>
        </section>
    )
}
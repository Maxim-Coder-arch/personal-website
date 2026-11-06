import type { ShowcaseLayoutProps } from "../../../model/types";

import styles from "../../styles/projects-showcase.module.scss";

export const ShowcaseLayout = ({ ref, children }: ShowcaseLayoutProps) => {
    return (
        <section
            ref={ref}
            id="projects-showcase"
            className={styles["showcase"]}
            aria-label="All projects"
        >
            {children}
        </section>
    );
};
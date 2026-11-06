import type { ClosingLayoutProps } from "../../../model/types";

import styles from "../../styles/closing-section.module.scss";

export const ClosingLayout = ({ children }: ClosingLayoutProps) => {
    return (
        <section
            id="projects-closing"
            className={styles["closing"]}
            aria-label="Closing statement"
        >
            {children}
        </section>
    );
};
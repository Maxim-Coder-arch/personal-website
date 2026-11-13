import type { SessionSectionProps } from "../../../model/types";

import styles from "../../styles/session-details.module.scss";

export const SessionSection = ({ title, children }: SessionSectionProps) => {
    return (
        <section>
            <h3 className={styles["section__title"]}>{title}</h3>
            {children}
        </section>
    );
};
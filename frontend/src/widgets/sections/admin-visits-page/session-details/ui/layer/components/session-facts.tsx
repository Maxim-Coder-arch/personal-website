import type { SessionFactsProps } from "../../../model/types";

import styles from "../../styles/session-details.module.scss";

export const SessionFacts = ({ facts }: SessionFactsProps) => {
    return (
        <dl className={styles["facts"]}>
            {facts.map((fact) => (
                <div key={fact.label} className={styles["facts__row"]}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                </div>
            ))}
        </dl>
    );
};
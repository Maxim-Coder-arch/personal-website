import { QUERY_STATE_LABELS } from "../../../model/data";
import type { QueryStateProps } from "../../../model/types";

import styles from "../../styles/query-boundary.module.scss";

export const QueryState = ({ kind, onRetry }: QueryStateProps) => {
    return (
        <div
            className={styles["query-state"]}
            data-kind={kind}
            role={kind === "error" ? "alert" : "status"}
        >
            <p className={styles["query-state__label"]}>
                <span
                    className={styles["query-state__dot"]}
                    aria-hidden="true"
                />
                {QUERY_STATE_LABELS[kind]}
            </p>

            {kind === "error" && onRetry && (
                <button
                    type="button"
                    className={styles["query-state__retry"]}
                    onClick={onRetry}
                >
                    {QUERY_STATE_LABELS.retry}
                </button>
            )}
        </div>
    );
};
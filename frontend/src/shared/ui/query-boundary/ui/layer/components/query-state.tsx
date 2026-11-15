import { useTranslations } from "next-intl";

import type { QueryStateProps } from "../../../model/types";

import styles from "../../styles/query-boundary.module.scss";

export const QueryState = ({ kind, onRetry }: QueryStateProps) => {
    const t = useTranslations("queryState");

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
                {t(kind)}
            </p>

            {kind === "error" && onRetry && (
                <button
                    type="button"
                    className={styles["query-state__retry"]}
                    onClick={onRetry}
                >
                    {t("retry")}
                </button>
            )}
        </div>
    );
};

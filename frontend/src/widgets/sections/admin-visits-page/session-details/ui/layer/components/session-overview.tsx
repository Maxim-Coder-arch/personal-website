import { formatDateTime } from "@/src/shared/lib/helpers/format-date";
import { translateKey } from "@/src/shared/lib/helpers/analytics-labels";
import { formatDuration } from "@/src/shared/lib/helpers/format-metrics";
import { CountryFlag } from "@/src/shared/ui/admin-ui";

import type { SessionOverviewProps } from "../../../model/types";

import styles from "../../styles/session-details.module.scss";

export const SessionOverview = ({ session }: SessionOverviewProps) => {
    const place = [translateKey(session.country ?? "Unknown"), session.region]
        .filter(Boolean)
        .join(", ");

    return (
        <div>
            <div className={styles["overview__place"]}>
                <CountryFlag code={session.countryCode} />
                {place}
            </div>

            <p className={styles["overview__time"]}>{formatDateTime(session.startedAt)}</p>

            <div className={styles["overview__badges"]}>
                <span
                    className={[
                        styles["badge"],
                        session.isReturning ? styles["badge--returning"] : styles["badge--new"],
                    ].join(" ")}
                >
                    {session.isReturning ? "Вернувшийся посетитель" : "Новый посетитель"}
                </span>
            </div>

            <div className={styles["kpis"]}>
                <div className={styles["kpi"]}>
                    <span className={styles["kpi__label"]}>Страниц</span>
                    <span className={styles["kpi__value"]}>{session.pageViewsCount}</span>
                </div>

                <div className={styles["kpi"]}>
                    <span className={styles["kpi__label"]}>Время</span>
                    <span className={styles["kpi__value"]}>
                        {formatDuration(session.durationSeconds)}
                    </span>
                </div>

                <div className={styles["kpi"]}>
                    <span className={styles["kpi__label"]}>Визит</span>
                    <span className={styles["kpi__value"]}>№{session.sessionNumber}</span>
                </div>
            </div>
        </div>
    );
};
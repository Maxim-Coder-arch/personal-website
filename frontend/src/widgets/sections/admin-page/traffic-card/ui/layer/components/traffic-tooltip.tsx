import { formatNumber } from "@/src/shared/lib/helpers/format-metrics";

import type { TrafficTooltipProps } from "../../../model/types";

import styles from "../../styles/admin-traffic-card.module.scss";

export const TrafficTooltip = ({ active, payload, metricLabel }: TrafficTooltipProps) => {
    const row = payload?.[0]?.payload;

    if (!active || !row) return null;

    return (
        <div className={styles["tooltip"]}>
            <span>{row.label}</span>

            <span className={styles["tooltip__value"]}>
                {formatNumber(row.value)} · {metricLabel.toLowerCase()}
            </span>

            {row.previous !== undefined && (
                <span className={styles["tooltip__previous"]}>
                    {row.previousLabel}: {formatNumber(row.previous)}
                </span>
            )}
        </div>
    );
};
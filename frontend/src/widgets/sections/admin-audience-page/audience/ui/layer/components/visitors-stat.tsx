import { formatNumber, formatPercent } from "@/src/shared/lib/helpers/format-metrics";
import { AnimatedNumber } from "@/src/shared/ui/admin-ui";

import type { VisitorsStatProps } from "../../../model/types";

import styles from "../../styles/admin-audience.module.scss";

export const VisitorsStat = ({ label, color, value, share }: VisitorsStatProps) => {
    return (
        <div className={styles["stat"]}>
            <span className={styles["stat__label"]}>
                <span className={styles["stat__dot"]} style={{ background: color }} />
                {label}
            </span>

            <AnimatedNumber
                className={styles["stat__value"]}
                value={value}
                format={formatNumber}
            />

            <span className={styles["stat__share"]}>{formatPercent(share)}</span>
        </div>
    );
};
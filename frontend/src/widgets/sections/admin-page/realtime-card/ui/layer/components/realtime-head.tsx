import { formatNumber } from "@/src/shared/lib/helpers/format-metrics";
import { AnimatedNumber } from "@/src/shared/ui/admin-ui";

import type { RealtimeHeadProps } from "../../../model/types";

import styles from "../../styles/admin-realtime-card.module.scss";

export const RealtimeHead = ({ count }: RealtimeHeadProps) => {
    return (
        <div className={styles["head"]}>
            <span className={styles["live"]} />

            <AnimatedNumber
                className={styles["count"]}
                value={count}
                format={formatNumber}
            />

            <span className={styles["caption"]}>за последние 5 минут</span>
        </div>
    );
};
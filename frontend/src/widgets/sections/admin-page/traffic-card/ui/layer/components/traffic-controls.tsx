"use client";

import { Segmented } from "@/src/shared/ui/admin-ui";

import { TRAFFIC_CONFIG } from "../../../model/config";
import { TRAFFIC_INTERVALS, TRAFFIC_METRICS } from "../../../model/data";
import type { TrafficControlsProps } from "../../../model/types";

import styles from "../../styles/admin-traffic-card.module.scss";

export const TrafficControls = ({
    metric,
    onMetricChange,
    interval,
    onIntervalChange,
    compare,
    onCompareToggle,
}: TrafficControlsProps) => {
    return (
        <div className={styles["controls"]}>
            <Segmented
                options={TRAFFIC_METRICS}
                value={metric}
                onChange={onMetricChange}
                layoutId={TRAFFIC_CONFIG.pills.metric}
            />

            <Segmented
                options={TRAFFIC_INTERVALS}
                value={interval}
                onChange={onIntervalChange}
                layoutId={TRAFFIC_CONFIG.pills.interval}
            />

            <button
                type="button"
                className={[styles["compare"], compare ? styles["compare--on"] : ""].join(" ")}
                onClick={onCompareToggle}
            >
                Сравнить
            </button>
        </div>
    );
};
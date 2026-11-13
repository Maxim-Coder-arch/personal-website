"use client";

import { motion } from "framer-motion";

import { formatTime } from "@/src/shared/lib/helpers/format-date";
import { formatDuration } from "@/src/shared/lib/helpers/format-metrics";
import { resolvePageLabel } from "@/src/shared/lib/helpers/resolve-page-label";

import { getTimelineItemMotion } from "../../../model/animations";
import type { SessionTimelineProps } from "../../../model/types";

import styles from "../../styles/session-details.module.scss";

export const SessionTimeline = ({ pageViews, titles }: SessionTimelineProps) => {
    return (
        <ol className={styles["timeline"]}>
            {pageViews.map((view, index) => (
                <motion.li
                    key={`${view.viewedAt}-${index}`}
                    className={styles["timeline__item"]}
                    {...getTimelineItemMotion(index)}
                >
                    <span className={styles["timeline__path"]}>
                        {resolvePageLabel(view.path, titles)}
                    </span>

                    <span className={styles["timeline__meta"]}>
                        {formatTime(view.viewedAt)} · {formatDuration(view.durationSeconds)}
                    </span>
                </motion.li>
            ))}
        </ol>
    );
};
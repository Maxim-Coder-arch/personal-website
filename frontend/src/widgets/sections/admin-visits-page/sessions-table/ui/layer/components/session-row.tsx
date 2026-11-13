"use client";

import { motion } from "framer-motion";

import { formatDateTime } from "@/src/shared/lib/helpers/format-date";
import { getDeviceTitle, translateKey } from "@/src/shared/lib/helpers/analytics-labels";
import { formatDuration } from "@/src/shared/lib/helpers/format-metrics";
import { resolvePageLabel } from "@/src/shared/lib/helpers/resolve-page-label";
import { CountryFlag } from "@/src/shared/ui/admin-ui";

import { getRowMotion } from "../../../model/animations";
import type { SessionRowProps } from "../../../model/types";

import styles from "../../styles/sessions-table.module.scss";

export const SessionRow = ({ session, titles, index, onSelect }: SessionRowProps) => {
    const badgeClass = [
        styles["badge"],
        session.isReturning ? styles["badge--returning"] : styles["badge--new"],
    ].join(" ");

    return (
        <motion.tr
            className={styles["row"]}
            onClick={() => onSelect(session.id)}
            {...getRowMotion(index)}
        >
            <td className={[styles["cell"], styles["cell--time"]].join(" ")}>
                <button
                    type="button"
                    className={styles["open"]}
                    onClick={(event) => {
                        event.stopPropagation();
                        onSelect(session.id);
                    }}
                >
                    {formatDateTime(session.startedAt)}
                </button>
            </td>

            <td className={[styles["cell"], styles["cell--visitor"]].join(" ")}>
                <span className={badgeClass}>
                    {session.isReturning ? `Вернулся · №${session.sessionNumber}` : "Новый"}
                </span>
            </td>

            <td className={[styles["cell"], styles["cell--country"]].join(" ")}>
                <span className={styles["country"]}>
                    <CountryFlag code={session.countryCode} />
                    {translateKey(session.country ?? "Unknown")}
                </span>
            </td>

            <td className={[styles["cell"], styles["cell--device"]].join(" ")}>
                {getDeviceTitle(session)}
            </td>

            <td className={[styles["cell"], styles["cell--browser"]].join(" ")}>
                {session.browser} · {session.os}
            </td>

            <td className={[styles["cell"], styles["cell--pages"]].join(" ")}>
                {session.pageViewsCount} стр.
            </td>

            <td className={[styles["cell"], styles["cell--duration"]].join(" ")}>
                {formatDuration(session.durationSeconds)}
            </td>

            <td className={[styles["cell"], styles["cell--entry"]].join(" ")}>
                <span className={styles["entry"]}>
                    {resolvePageLabel(session.entryPath, titles)}
                </span>
            </td>
        </motion.tr>
    );
};
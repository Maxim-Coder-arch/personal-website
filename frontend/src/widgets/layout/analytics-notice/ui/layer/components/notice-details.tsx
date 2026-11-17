"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { ANALYTICS_NOTICE_CONFIG } from "../../../model/config";
import { DETAILS_MOTION } from "../../../model/animations";
import { NOTICE_DETAIL_KEYS } from "../../../model/data";
import type { NoticeDetailsProps } from "../../../model/types";

import styles from "../../styles/analytics-notice.module.scss";

export const NoticeDetails = ({ expanded }: NoticeDetailsProps) => {
    const t = useTranslations("analyticsNotice.details");

    return (
        <AnimatePresence initial={false}>
            {expanded && (
                <motion.ul
                    id={ANALYTICS_NOTICE_CONFIG.detailsId}
                    className={styles["notice__details"]}
                    {...DETAILS_MOTION}
                >
                    {NOTICE_DETAIL_KEYS.map((key) => (
                        <li key={key} className={styles["notice__detail"]}>
                            {t(key)}
                        </li>
                    ))}
                </motion.ul>
            )}
        </AnimatePresence>
    );
};
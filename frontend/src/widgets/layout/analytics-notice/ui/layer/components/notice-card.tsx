"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { useNoticeDisclosure } from "../../../lib/hooks/use-notice-disclosure";
import { useNoticeOffset } from "../../../lib/hooks/use-notice-offset";

import { getCardMotion } from "../../../model/animations";
import { ANALYTICS_NOTICE_CONFIG } from "../../../model/config";
import type { NoticeCardProps } from "../../../model/types";

import { NoticeDetails } from "./notice-details";

import styles from "../../styles/analytics-notice.module.scss";

export const NoticeCard = ({ onAccept }: NoticeCardProps) => {
    const t = useTranslations("analyticsNotice");
    const shouldReduceMotion = useReducedMotion();
    const { expanded, toggle } = useNoticeDisclosure();
    const asideRef = useRef<HTMLElement>(null);

    useNoticeOffset(asideRef);

    return (
        <motion.aside
            ref={asideRef}
            className={styles["notice"]}
            role="region"
            aria-label={t("label")}
            {...getCardMotion(Boolean(shouldReduceMotion))}
        >
            <p className={styles["notice__eyebrow"]}>
                <span className={styles["notice__dot"]} aria-hidden="true" />
                {t("eyebrow")}
            </p>

            <p className={styles["notice__text"]}>{t("text")}</p>

            <NoticeDetails expanded={expanded} />

            <div className={styles["notice__footer"]}>
                <button
                    type="button"
                    className={styles["notice__toggle"]}
                    aria-expanded={expanded}
                    aria-controls={ANALYTICS_NOTICE_CONFIG.detailsId}
                    onClick={toggle}
                >
                    {t("detailsTitle")}
                    <ChevronDown
                        size={14}
                        className={[
                            styles["notice__chevron"],
                            expanded ? styles["notice__chevron--open"] : "",
                        ].join(" ")}
                    />
                </button>

                <button type="button" className={styles["notice__accept"]} onClick={onAccept}>
                    {t("accept")}
                </button>
            </div>
        </motion.aside>
    );
};
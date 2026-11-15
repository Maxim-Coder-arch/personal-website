"use client";

import { motion, useReducedMotion } from "framer-motion";

import { useTranslations } from "next-intl";

import { animation } from "../../../model/animations";

import styles from "../../styles/experience.module.scss";

export const ExperienceHeader = () => {
    const t = useTranslations("experience");
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.header
            className={styles["experience__heading"]}
            initial={
                shouldReduceMotion
                    ? false
                    : {
                          opacity: 0,
                          y: animation.heading.offsetY,
                      }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
                once: animation.once,
                amount: animation.heading.viewportAmount,
            }}
            transition={{
                duration: shouldReduceMotion
                    ? 0
                    : animation.heading.duration,
                ease: animation.easing,
            }}
        >
            <div className={styles["experience__eyebrow"]}>
                <span />
                {t("eyebrow")}
            </div>

            <div className={styles["experience__heading-main"]}>
                <h2 id="experience-title">{t("heading")}</h2>

                <p>
                    {t("subtitleTop")}
                    <br />
                    {t("subtitleBottom")}
                </p>
            </div>

            <div className={styles["experience__heading-bottom"]}>
                <span>{t("sectionDescription")}</span>
                <span>{t("sectionIndex")}</span>
            </div>
        </motion.header>
    );
};

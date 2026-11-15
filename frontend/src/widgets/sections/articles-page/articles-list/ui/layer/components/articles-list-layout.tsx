"use client";

import { motion } from "framer-motion";

import { useTranslations } from "next-intl";

import { LIST_VARIANTS, LIST_VIEWPORT } from "../../../model/animations";
import type { ArticlesListLayoutProps } from "../../../model/types";

import styles from "../../styles/articles-list.module.scss";

export const ArticlesListLayout = ({
    shouldReduceMotion,
    children,
}: ArticlesListLayoutProps) => {
    const t = useTranslations("articlesPage.list");

    return (
        <section
            id="articles-list"
            className={styles["articles-list"]}
            aria-label={t("label")}
        >
            <motion.ul
                className={styles["articles-list__list"]}
                variants={shouldReduceMotion ? undefined : LIST_VARIANTS}
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={LIST_VIEWPORT}
            >
                {children}
            </motion.ul>
        </section>
    );
};
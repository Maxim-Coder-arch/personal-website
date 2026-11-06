"use client";

import { motion } from "framer-motion";

import { LIST_VARIANTS, LIST_VIEWPORT } from "../../../model/animations";
import type { ArticlesListLayoutProps } from "../../../model/types";

import styles from "../../styles/articles-list.module.scss";

export const ArticlesListLayout = ({
    shouldReduceMotion,
    children,
}: ArticlesListLayoutProps) => {
    return (
        <section
            id="articles-list"
            className={styles["articles-list"]}
            aria-label="Articles"
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
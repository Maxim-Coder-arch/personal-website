"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import { formatArticleDate } from "@/src/entities/article";
import { ArrowRightUp } from "@/src/shared/icons/arrowes/arrow-right-up";

import { ITEM_VARIANTS } from "../../../model/animations";
import type { ArticlesListItemProps } from "../../../model/types";

import styles from "../../styles/articles-list.module.scss";

export const ArticlesListItem = ({
    article,
    index,
    shouldReduceMotion,
}: ArticlesListItemProps) => {
    return (
        <motion.li
            className={styles["articles-list__item"]}
            variants={shouldReduceMotion ? undefined : ITEM_VARIANTS}
        >
            <Link
                href={`/articles/${article.id}`}
                scroll={false}
                className={styles["articles-list__link"]}
            >
                <span className={styles["articles-list__number"]}>
                    {String(index + 1).padStart(2, "0")}
                </span>

                <div className={styles["articles-list__body"]}>
                    <h2 className={styles["articles-list__title"]}>
                        {article.title}
                    </h2>

                    <p className={styles["articles-list__subtitle"]}>
                        {article.subtitle}
                    </p>
                </div>

                <time
                    className={styles["articles-list__date"]}
                    dateTime={article.createdAt}
                >
                    {formatArticleDate(article.createdAt)}
                </time>

                <span
                    className={styles["articles-list__arrow"]}
                    aria-hidden="true"
                >
                    <ArrowRightUp />
                </span>
            </Link>
        </motion.li>
    );
};
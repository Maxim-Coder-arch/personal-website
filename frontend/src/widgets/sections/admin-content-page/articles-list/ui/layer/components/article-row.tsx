"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Pencil, Trash2 } from "lucide-react";

import { formatArticleDate, getReadingStats } from "@/src/entities/article";
import { ADMIN_ROUTES } from "@/src/shared/config/admin-routes";
import { AdminButton } from "@/src/shared/ui/admin-ui";

import { getRowMotion } from "../../../model/animations";
import type { ArticleRowProps } from "../../../model/types";

import styles from "../../styles/articles-list.module.scss";

export const ArticleRow = ({ article, index, onDelete }: ArticleRowProps) => {
    const { words, minutes } = getReadingStats(article.text);

    return (
        <motion.li className={styles["row"]} {...getRowMotion(index)}>
            <div className={styles["row__main"]}>
                <Link href={ADMIN_ROUTES.articleEdit(article.id)} className={styles["row__title"]}>
                    {article.title}
                </Link>

                <p className={styles["row__subtitle"]}>{article.subtitle}</p>

                <div className={styles["row__meta"]}>
                    <span>{formatArticleDate(article.createdAt)}</span>
                    <span>{words} слов</span>
                    <span>{minutes} мин чтения</span>
                </div>
            </div>

            <div className={styles["row__actions"]}>
                <AdminButton
                    size="sm"
                    href={ADMIN_ROUTES.articleEdit(article.id)}
                    icon={<Pencil size={14} />}
                >
                    Изменить
                </AdminButton>

                <AdminButton
                    size="sm"
                    href={ADMIN_ROUTES.siteArticle(article.id)}
                    external
                    icon={<ExternalLink size={14} />}
                >
                    На сайте
                </AdminButton>

                <AdminButton
                    size="sm"
                    variant="danger"
                    icon={<Trash2 size={14} />}
                    onClick={() => onDelete(article)}
                >
                    Удалить
                </AdminButton>
            </div>
        </motion.li>
    );
};
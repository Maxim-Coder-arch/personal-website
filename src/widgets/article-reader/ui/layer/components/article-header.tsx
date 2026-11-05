import { formatArticleDate } from "@/src/entities/article";

import type { ArticleHeaderProps } from "../../../model/types";

import styles from "../../styles/article-reader.module.scss";

export const ArticleHeader = ({ article, reading }: ArticleHeaderProps) => {
    return (
        <header className={styles["content__header"]}>
            {!reading && (
                <time
                    className={styles["content__date"]}
                    dateTime={article.createdAt}
                >
                    {formatArticleDate(article.createdAt)}
                </time>
            )}

            <h1
                id={`article-title-${article.id}`}
                className={styles["content__title"]}
            >
                {article.title}
            </h1>

            <p className={styles["content__subtitle"]}>{article.subtitle}</p>
        </header>
    );
};
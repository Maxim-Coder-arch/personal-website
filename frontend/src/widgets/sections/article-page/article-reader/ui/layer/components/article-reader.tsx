"use client";

import { splitParagraphs } from "@/src/entities/article";

import type { ArticleReaderProps } from "../../../model/types";

import { ArticleBody } from "./article-body";
import { ArticleHeader } from "./article-header";
import { ArticleToolbar } from "./article-toolbar";
import { ReadingExitButton } from "./reading-exit-button";

import styles from "../../styles/article-reader.module.scss";

export const ArticleReader = ({
    article,
    variant,
    reading,
    onEnterReading,
    onExitReading,
    onClose,
}: ArticleReaderProps) => {
    const paragraphs = splitParagraphs(article.text);

    return (
        <>
            {reading && <ReadingExitButton onClick={onExitReading} />}

            <div className={styles["shell"]}>
                {!reading && (
                    <ArticleToolbar
                        variant={variant}
                        onEnterReading={onEnterReading}
                        onClose={onClose}
                    />
                )}

                <article className={styles["content"]}>
                    <ArticleHeader article={article} reading={reading} />
                    <ArticleBody paragraphs={paragraphs} />
                </article>
            </div>
        </>
    );
};
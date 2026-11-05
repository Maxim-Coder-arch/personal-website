"use client";

import { useScrollLock } from "@/src/shared/lib/hooks/use-scroll-lock";

import { useArticleReader } from "../../lib/hooks/use-article-reader";
import type { ArticlePageReaderProps } from "../../model/types";

import { ArticleReader } from "./components/article-reader";

import styles from "../styles/article-reader.module.scss";

export const ArticlePageReader = ({ article }: ArticlePageReaderProps) => {
    const { reading, enterReading, exitReading } = useArticleReader();

    useScrollLock(reading);

    return (
        <div
            className={styles["page"]}
            data-mode={reading ? "reading" : "default"}
        >
            <ArticleReader
                article={article}
                variant="page"
                reading={reading}
                onEnterReading={enterReading}
                onExitReading={exitReading}
            />
        </div>
    );
};
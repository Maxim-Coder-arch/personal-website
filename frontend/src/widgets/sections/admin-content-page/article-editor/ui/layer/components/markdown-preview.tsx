"use client";

import { useDeferredValue } from "react";

import { Markdown } from "@/src/shared/ui/markdown";

import { ARTICLE_EDITOR_CONFIG } from "../../../model/config";
import type { MarkdownPreviewProps } from "../../../model/types";

import styles from "../../styles/article-editor.module.scss";

export const MarkdownPreview = ({ value }: MarkdownPreviewProps) => {
    const deferred = useDeferredValue(value);

    return (
        <div className={styles["preview"]}>
            {deferred.trim() ? (
                <Markdown source={deferred} />
            ) : (
                <p className={styles["preview__empty"]}>{ARTICLE_EDITOR_CONFIG.previewPlaceholder}</p>
            )}
        </div>
    );
};
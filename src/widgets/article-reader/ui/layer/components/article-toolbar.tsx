import Link from "next/link";

import { READER_LABELS } from "../../../model/data";
import type { ArticleToolbarProps } from "../../../model/types";

import styles from "../../styles/article-reader.module.scss";

export const ArticleToolbar = ({
    variant,
    onEnterReading,
    onClose,
}: ArticleToolbarProps) => {
    return (
        <div
            className={styles["toolbar"]}
            data-variant={variant}
        >
            {variant === "modal" ? (
                <button
                    type="button"
                    className={styles["toolbar__button"]}
                    onClick={onClose}
                >
                    {READER_LABELS.close}
                </button>
            ) : (
                <Link
                    href="/articles"
                    className={styles["toolbar__button"]}
                >
                    {READER_LABELS.back}
                </Link>
            )}

            <button
                type="button"
                className={styles["toolbar__button"]}
                onClick={onEnterReading}
            >
                {READER_LABELS.enterReading}
            </button>
        </div>
    );
};
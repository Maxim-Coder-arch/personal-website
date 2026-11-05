import Link from "next/link";

import { CloseIcon } from "@/src/shared/icons/globals/close-icon";

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
            <button
                type="button"
                className={styles["toolbar__button"]}
                onClick={onEnterReading}
            >
                {READER_LABELS.enterReading}
            </button>

            {variant === "modal" ? (
                <button
                    type="button"
                    className={`${styles["toolbar__button"]} ${styles["toolbar__button--icon"]}`}
                    onClick={onClose}
                    aria-label={READER_LABELS.close}
                >
                    <CloseIcon />
                </button>
            ) : (
                <Link
                    href="/articles"
                    className={styles["toolbar__button"]}
                >
                    {READER_LABELS.back}
                </Link>
            )}
        </div>
    );
};
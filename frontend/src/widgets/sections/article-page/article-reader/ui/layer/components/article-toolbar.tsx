import Link from "next/link";

import { useTranslations } from "next-intl";

import { CloseIcon } from "@/src/shared/icons/globals/close-icon";

import type { ArticleToolbarProps } from "../../../model/types";

import styles from "../../styles/article-reader.module.scss";

export const ArticleToolbar = ({
    variant,
    onEnterReading,
    onClose,
}: ArticleToolbarProps) => {
    const t = useTranslations("reader");

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
                {t("enterReading")}
            </button>

            {variant === "modal" ? (
                <button
                    type="button"
                    className={`${styles["toolbar__button"]} ${styles["toolbar__button--icon"]}`}
                    onClick={onClose}
                    aria-label={t("close")}
                >
                    <CloseIcon />
                </button>
            ) : (
                <Link
                    href="/articles"
                    className={styles["toolbar__button"]}
                >
                    {t("back")}
                </Link>
            )}
        </div>
    );
};
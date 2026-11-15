import { useTranslations } from "next-intl";

import type { ReadingExitButtonProps } from "../../../model/types";

import styles from "../../styles/article-reader.module.scss";

export const ReadingExitButton = ({ onClick }: ReadingExitButtonProps) => {
    const t = useTranslations("reader");

    return (
        <div className={styles["exit"]}>
            <button
                type="button"
                className={styles["exit__button"]}
                onClick={onClick}
            >
                {t("exitReading")}
            </button>
        </div>
    );
};
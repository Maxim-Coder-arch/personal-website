import { useTranslations } from "next-intl";

import type { ClosingLayoutProps } from "../../../model/types";

import styles from "../../styles/closing-section.module.scss";

export const ClosingLayout = ({ children }: ClosingLayoutProps) => {
    const t = useTranslations("articlesPage.closing");

    return (
        <section
            id="articles-closing"
            className={styles["closing"]}
            aria-label={t("label")}
        >
            {children}
        </section>
    );
};
import { useTranslations } from "next-intl";

import type { ClosingLayoutProps } from "../../../model/types";

import styles from "../../styles/closing-section.module.scss";

export const ClosingLayout = ({ children }: ClosingLayoutProps) => {
    const t = useTranslations("projectsPage.closing");

    return (
        <section
            id="projects-closing"
            className={styles["closing"]}
            aria-label={t("label")}
        >
            {children}
        </section>
    );
};
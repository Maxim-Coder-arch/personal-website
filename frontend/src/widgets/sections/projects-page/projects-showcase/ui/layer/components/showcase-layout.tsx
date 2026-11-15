import { useTranslations } from "next-intl";

import type { ShowcaseLayoutProps } from "../../../model/types";

import styles from "../../styles/projects-showcase.module.scss";

export const ShowcaseLayout = ({ ref, children }: ShowcaseLayoutProps) => {
    const t = useTranslations("projectsPage.showcase");

    return (
        <section
            ref={ref}
            id="projects-showcase"
            className={styles["showcase"]}
            aria-label={t("label")}
        >
            {children}
        </section>
    );
};
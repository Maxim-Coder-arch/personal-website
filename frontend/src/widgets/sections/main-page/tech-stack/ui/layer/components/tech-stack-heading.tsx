import { useTranslations } from "next-intl";

import styles from "../../styles/tech-stack.module.scss";

export const TechStackHeader = () => {
    const t = useTranslations("techStack");

    return (
        <header className={`${styles["tech-stack__heading"]} w-full flex flex-col`}>
            <div className="w-full flex justify-start">
                <h2>{t("heading")}</h2>
            </div>

            <div className="w-full flex justify-end">
                <h3>{t("subheading")}</h3>
            </div>
        </header>
    );
};
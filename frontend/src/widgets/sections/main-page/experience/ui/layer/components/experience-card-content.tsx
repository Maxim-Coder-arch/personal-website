import { useTranslations } from "next-intl";

import { ExperienceCardContentProps } from "../../../model/type";

import styles from "../../styles/experience.module.scss";

export const ExperienceCardContent = ({
    experience,
}: ExperienceCardContentProps) => {
    const t = useTranslations("experience.items");

    return (
        <div className={styles["experience__card-content"]}>
            <h3>{t(`${experience.id}.title`)}</h3>
            <p>{t(`${experience.id}.description`)}</p>
        </div>
    );
};
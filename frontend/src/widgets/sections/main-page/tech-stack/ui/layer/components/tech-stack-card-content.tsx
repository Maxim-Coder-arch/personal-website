import { useTranslations } from "next-intl";

import { TechStackCardContentProps } from "../../../model/types";

import styles from "../../styles/tech-stack.module.scss";

export const TechStackCardContent = ({
    technology,
}: TechStackCardContentProps) => {
    const t = useTranslations("techStack.items");

    return (
        <div className={styles["tech-stack__card-content"]}>
            <h4 className={styles["tech-stack__card-title"]}>
                {t(`${technology.id}.title`)}
            </h4>

            <p className={styles["tech-stack__card-description"]}>
                {t(`${technology.id}.description`)}
            </p>
        </div>
    );
};

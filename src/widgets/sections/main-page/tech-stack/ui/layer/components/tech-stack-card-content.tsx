import { TechStackCardContentProps } from "../../../model/types";

import styles from "../../styles/tech-stack.module.scss";

export const TechStackCardContent = ({
    technology,
}: TechStackCardContentProps) => {
    return (
        <div className={styles["tech-stack__card-content"]}>
            <h4 className={styles["tech-stack__card-title"]}>
                {technology.title}
            </h4>

            <p className={styles["tech-stack__card-description"]}>
                {technology.description}
            </p>
        </div>
    );
};

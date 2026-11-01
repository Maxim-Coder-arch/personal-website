import { ExperienceCardContentProps } from "../../../model/type";

import styles from "../../styles/experience.module.scss";

export const ExperienceCardContent = ({
    experience,
}: ExperienceCardContentProps) => {
    return (
        <div className={styles["experience__card-content"]}>
            <h3>{experience.title}</h3>
            <p>{experience.description}</p>
        </div>
    );
};
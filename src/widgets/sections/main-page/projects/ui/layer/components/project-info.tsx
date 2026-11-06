
import { SplitReveal } from "@/src/shared/ui/split-reveal";

import { ProjectInfoProps } from "../../../model/types";

import { ProjectSpecs } from "./project-specs";

import styles from "../../styles/projects.module.scss";

export const ProjectInfo = ({
    title,
    subtitle,
    description,
    specs,
    index,
    total,
}: ProjectInfoProps) => {
    const number = String(index + 1).padStart(2, "0");
    const count = String(total).padStart(2, "0");

    return (
        <div className={styles["projects-section__body"]}>
            <div className={styles["projects-section__meta"]}>
                <span className={styles["projects-section__counter"]}>
                    {number} / {count}
                </span>

                <span className={styles["projects-section__kind"]}>
                    {subtitle}
                </span>
            </div>

            <h3 className={styles["projects-section__title"]}>
                <SplitReveal
                    text={title}
                    unit="word"
                    stagger={0.08}
                    delay={0.3}
                />
            </h3>

            <p className={styles["projects-section__description"]}>
                {description}
            </p>

            {specs && specs.length > 0 && <ProjectSpecs specs={specs} />}
        </div>
    );
};
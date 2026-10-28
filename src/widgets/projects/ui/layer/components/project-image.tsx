
import Image from "next/image";

import { ArrowRightUp } from "@/src/shared/icons/arrow-right-up";

import { ProjectImageProps } from "../../../model/types";

import styles from "../../styles/projects.module.scss";

export const ProjectImage = ({
    title,
    imagePath,
    index,
}: ProjectImageProps) => {
    const projectNumber = String(index + 1).padStart(2, "0");

    return (
        <div
            className={styles["projects-section__project-list__project-card__image"]}
        >
            <Image
                src={imagePath}
                alt={`Превью проекта ${title}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 50vw"
                loading={index === 0 ? "eager" : "lazy"}
                className={styles["projects-section__project-image"]}
            />

            <div
                className={styles["projects-section__project-image-overlay"]}
                aria-hidden="true"
            />

            <span className={styles["projects-section__project-number"]}>
                {projectNumber}
            </span>

            <span
                className={styles["projects-section__project-open"]}
                aria-hidden="true"
            >
                <ArrowRightUp />
            </span>
        </div>
    );
};

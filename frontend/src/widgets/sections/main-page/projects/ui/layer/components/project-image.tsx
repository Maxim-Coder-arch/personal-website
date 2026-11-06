
import Image from "next/image";

import { motion } from "framer-motion";

import { ProjectImageProps } from "../../../model/types";

import styles from "../../styles/projects.module.scss";

export const ProjectImage = ({
    title,
    imagePath,
    index,
    animation,
}: ProjectImageProps) => {
    return (
        <motion.div
            className={styles["projects-section__image"]}
            variants={animation}
        >
            <Image
                src={imagePath}
                alt={`Превью проекта ${title}`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                loading={index === 0 ? "eager" : "lazy"}
                className={styles["projects-section__image-el"]}
            />
        </motion.div>
    );
};
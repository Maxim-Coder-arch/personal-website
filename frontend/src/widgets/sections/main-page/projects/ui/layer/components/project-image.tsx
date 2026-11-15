
import Image from "next/image";

import { motion } from "framer-motion";

import { useTranslations } from "next-intl";

import { ProjectImageProps } from "../../../model/types";

import styles from "../../styles/projects.module.scss";

export const ProjectImage = ({
    title,
    imagePath,
    index,
    animation,
}: ProjectImageProps) => {
    const t = useTranslations("projectsSection");

    return (
        <motion.div
            className={styles["projects-section__image"]}
            variants={animation}
        >
            <Image
                src={imagePath}
                alt={t("imageAlt", { title })}
                fill
                unoptimized
                sizes="(max-width: 640px) 100vw, 50vw"
                loading={index === 0 ? "eager" : "lazy"}
                className={styles["projects-section__image-el"]}
            />
        </motion.div>
    );
};
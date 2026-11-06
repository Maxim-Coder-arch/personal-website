
"use client";

import { motion } from "framer-motion";

import { useProjectSpotlight } from "../../../lib/hooks/use-project-spotlight";
import { projectImageAnimation } from "../../../model/animations";
import type { ProjectCardProps } from "../../../model/types";

import { ProjectImage } from "./project-image";
import { ProjectInfo } from "./project-info";

import styles from "../../styles/projects.module.scss";


export const ProjectCard = ({
    project,
    index,
    total,
    animation,
}: ProjectCardProps) => {
    const { ref, handlePointerMove } = useProjectSpotlight();

    return (
        <motion.article
            ref={ref}
            className={styles["projects-section__card"]}
            variants={animation}
            onPointerMove={handlePointerMove}
        >
            <ProjectImage
                title={project.title}
                imagePath={project.imagePath}
                index={index}
                animation={animation ? projectImageAnimation : undefined}
            />

            <ProjectInfo
                title={project.title}
                subtitle={project.subtitle}
                description={project.description}
                specs={project.additionalData}
                index={index}
                total={total}
            />
        </motion.article>
    );
};
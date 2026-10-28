
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { ProjectCardProps } from "../../../model/types";

import { ProjectImage } from "./project-image";

import { ProjectInfo } from "./project-info";

import styles from "../../styles/projects.module.scss";


export const ProjectCard = ({
    project,
    index,
    animation,
}: ProjectCardProps) => {
    return (
        <motion.div
            className={styles["projects-section__project-wrapper"]}
            variants={animation}
        >
            <Link
                href={project.id.startsWith("/")
                    ? project.id
                    : `/projects/${project.id}`}
                className={styles["projects-section__project-list__project-card"]}
                aria-label={`Посмотреть проект ${project.title}`}
            >
                <ProjectImage
                    title={project.title}
                    imagePath={project.imagePath}
                    index={index}
                />

                <ProjectInfo
                    title={project.title}
                    subtitle={project.subtitle}
                    index={index}
                />
            </Link>
        </motion.div>
    );
};
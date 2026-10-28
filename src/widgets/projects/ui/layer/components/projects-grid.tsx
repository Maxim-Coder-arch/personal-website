
"use client";

import { motion, useReducedMotion } from "framer-motion";

import { projectCardAnimation, projectsSectionAnimation } from "../../../model/animations";
import type { ProjectsGridProps } from "../../../model/types";

import { ProjectCard } from "./project-card";

import styles from "../../styles/projects.module.scss";


export const ProjectsGrid = ({ projects }: ProjectsGridProps) => {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            className={styles["projects-section__project-list"]}
            variants={
                shouldReduceMotion ? undefined : projectsSectionAnimation
            }
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.15 }}
        >
            {projects.map((project, index) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    animation={shouldReduceMotion ? undefined : projectCardAnimation}
                />
            ))}
        </motion.div>
    );
};
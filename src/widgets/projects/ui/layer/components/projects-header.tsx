
"use client";

import { motion, useReducedMotion } from "framer-motion";

import { projectsHeadingAnimation } from "../../../model/animations";

import { ViewAllProjects } from "./view-all-projects";

import styles from "../../styles/projects.module.scss";

export const ProjectsHeader = () => {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            className={`${styles["projects-section__heading"]} flex justify-between items-center`}
            variants={shouldReduceMotion ? undefined : projectsHeadingAnimation}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.5 }}
        >
            <div className={styles["projects-section__heading-content"]}>
                <span className={styles["projects-section__eyebrow"]}>
                    SELECTED WORKS
                </span>

                <h2>
                    Projects<span>.</span>
                </h2>
            </div>

            <ViewAllProjects />
        </motion.div>
    );
};
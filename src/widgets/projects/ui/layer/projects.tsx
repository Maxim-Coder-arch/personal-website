
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { ArrowRightUp } from "@/src/shared/icons/arrow-right-up";
import { projects } from "../../model/dev-mock.data";

import styles from "../styles/projects.module.scss";

const sectionAnimation = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.14,
            delayChildren: 0.08,
        },
    },
};

const headingAnimation = {
    hidden: {
        opacity: 0,
        y: 24,
        filter: "blur(8px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
};

const cardAnimation = {
    hidden: {
        opacity: 0,
        y: 48,
        scale: 0.97,
        filter: "blur(10px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
};

export const Projects = () => {
    const shouldReduceMotion = useReducedMotion();

    const sectionVariants = shouldReduceMotion
        ? undefined
        : sectionAnimation;

    const itemVariants = shouldReduceMotion
        ? undefined
        : headingAnimation;

    const projectVariants = shouldReduceMotion
        ? undefined
        : cardAnimation;

    return (
        <section id="projects" className={styles["projects-section"]}>
            <div className="min-h-screen px-8 py-10 flex flex-col gap-8">
                <motion.div
                    className={`${styles["projects-section__heading"]} flex justify-between items-center`}
                    variants={itemVariants}
                    initial={shouldReduceMotion ? false : "hidden"}
                    whileInView={shouldReduceMotion ? undefined : "visible"}
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <div className={styles["projects-section__heading-content"]}>
                        <span className={styles["projects-section__eyebrow"]}>
                            SELECTED WORKS
                        </span>

                        <h2>Projects<span>.</span></h2>
                    </div>

                    <div className={styles["projects-section__heading__more-projects"]}>
                        <Link
                            href="/projects"
                            className="flex items-center gap-4 px-6 py-3 rounded-3xl"
                        >
                            <span>Все проекты</span>
                            <ArrowRightUp />
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    className={styles["projects-section__project-list"]}
                    variants={sectionVariants}
                    initial={shouldReduceMotion ? false : "hidden"}
                    whileInView={shouldReduceMotion ? undefined : "visible"}
                    viewport={{ once: true, amount: 0.15 }}
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className={styles["projects-section__project-wrapper"]}
                            variants={projectVariants}
                        >
                            <Link
                                href={project.id}
                                className={styles["projects-section__project-list__project-card"]}
                                aria-label={`Посмотреть проект ${project.title}`}
                            >
                                <div
                                    className={styles["projects-section__project-list__project-card__image"]}
                                >
                                    <Image
                                        src={project.imagePath}
                                        alt={`Превью проекта ${project.title}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        priority={index === 0}
                                        className={styles["projects-section__project-image"]}
                                    />

                                    <div
                                        className={styles["projects-section__project-image-overlay"]}
                                        aria-hidden="true"
                                    />

                                    <span className={styles["projects-section__project-number"]}>
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <span className={styles["projects-section__project-open"]}>
                                        <ArrowRightUp />
                                    </span>
                                </div>

                                <div className={styles["projects-section__project-info"]}>
                                    <div className={styles["projects-section__project-title"]}>
                                        <h3>{project.title}</h3>
                                        <span>{project.subtitle}</span>
                                    </div>

                                    <span className={styles["projects-section__project-index"]}>
                                        PROJECT / {String(index + 1).padStart(2, "0")}
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
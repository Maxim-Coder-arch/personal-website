
"use client";

import { motion, useReducedMotion } from "framer-motion";


import styles from "../styles/experience.module.scss";
import { experience } from "../../model/data";
import { animation, cardVariants, containerVariants, labels } from "../../model/animations";


export const Experience = () => {
    const shouldReduceMotion = useReducedMotion();

    const headingInitial = shouldReduceMotion
        ? false
        : { opacity: 0, y: animation.heading.offsetY };

    return (
        <section
            id="experience"
            aria-labelledby="experience-title"
        >
            <div
                className={`${styles.experience} min-h-screen py-8 px-6`}
            >
                <div className={styles["experience__inner"]}>
                    <motion.header
                        className={styles["experience__heading"]}
                        initial={headingInitial}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{
                            once: animation.once,
                            amount: animation.heading.viewportAmount,
                        }}
                        transition={{
                            duration: shouldReduceMotion
                                ? 0
                                : animation.heading.duration,
                            ease: animation.easing,
                        }}
                    >
                        <div className={styles["experience__eyebrow"]}>
                            <span />
                            {labels.eyebrow}
                        </div>

                        <div
                            className={styles["experience__heading-main"]}
                        >
                            <h2 id="experience-title">
                                {labels.heading}
                            </h2>

                            <p>
                                {labels.subtitle[0]}
                                <br />
                                {labels.subtitle[1]}
                            </p>
                        </div>

                        <div
                            className={styles["experience__heading-bottom"]}
                        >
                            <span>{labels.sectionDescription}</span>
                            <span>{labels.sectionIndex}</span>
                        </div>
                    </motion.header>

                    <motion.div
                        className={styles["experience__grid"]}
                        variants={
                            shouldReduceMotion
                                ? undefined
                                : containerVariants
                        }
                        initial={shouldReduceMotion ? false : "hidden"}
                        whileInView="visible"
                        viewport={{
                            once: animation.once,
                            amount: animation.cards.viewportAmount,
                        }}
                    >
                        {experience.map((item, index) => (
                            <motion.article
                                key={item.id}
                                className={styles["experience__card"]}
                                variants={
                                    shouldReduceMotion
                                        ? undefined
                                        : cardVariants
                                }
                                whileHover={
                                    shouldReduceMotion
                                        ? undefined
                                        : {
                                              y: animation.hover.offsetY,
                                              transition: {
                                                  duration:
                                                      animation.hover.duration,
                                              },
                                          }
                                }
                            >
                                <div
                                    className={
                                        styles["experience__card-top"]
                                    }
                                >
                                    <span
                                        className={
                                            styles["experience__card-number"]
                                        }
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <span
                                        className={
                                            styles["experience__card-indicator"]
                                        }
                                        aria-hidden="true"
                                    />
                                </div>

                                <div
                                    className={
                                        styles["experience__card-content"]
                                    }
                                >
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>

                                <div
                                    className={
                                        styles["experience__card-footer"]
                                    }
                                >
                                    <span>
                                        {index === 0
                                            ? `01 / ${labels.current}`
                                            : `${String(index + 1).padStart(2, "0")} / ${labels.experience}`}
                                    </span>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};


"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { ArrowRightUp } from "@/src/shared/icons/arrowes/arrow-right-up";


import styles from "../styles/thoughts-development.module.scss";
import { thoughts } from "../../model/data";
import { THOUGHTS_CONFIG } from "../../model/animations";

const { animation } = THOUGHTS_CONFIG;

const listVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: animation.list.stagger,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: animation.list.offsetY,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: animation.list.duration,
            ease: animation.easing,
        },
    },
};

export const ThoughtsDevelopment = () => {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section
            id="thoughts-development"
            aria-labelledby="thoughts-title"
        >
            <div
                className={`${styles["thoughts-development"]} min-h-screen py-8 px-6 flex flex-col gap-16`}
            >
                <motion.header
                    className={styles["thoughts-development__heading"]}
                    initial={
                        shouldReduceMotion
                            ? false
                            : {
                                  opacity: 0,
                                  y: animation.heading.offsetY,
                              }
                    }
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
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
                    <h2 id="thoughts-title">
                        Thoughts <br />
                        on development
                    </h2>
                </motion.header>

                <motion.ul
                    className={styles["thoughts-development__list"]}
                    variants={
                        shouldReduceMotion
                            ? undefined
                            : listVariants
                    }
                    initial={shouldReduceMotion ? false : "hidden"}
                    whileInView="visible"
                    viewport={{
                        once: animation.once,
                        amount: animation.list.viewportAmount,
                    }}
                >
                    {thoughts.map((thought, index) => (
                        <motion.li
                            key={thought.id}
                            className={
                                styles["thoughts-development__list-item"]
                            }
                            variants={
                                shouldReduceMotion
                                    ? undefined
                                    : itemVariants
                            }
                        >
                            <Link
                                href={`/thoughts/${thought.slug}`}
                                className={
                                    styles["thoughts-development__link"]
                                }
                            >
                                <div
                                    className={
                                        styles["thoughts-development__content"]
                                    }
                                >
                                    <div
                                        className={
                                            styles["thoughts-development__title"]
                                        }
                                    >
                                        <span className={
                                            styles["thoughts-development__number"]
                                        }>
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                        <h3>{thought.title}</h3>
                                    </div>

                                    <p>{thought.text}</p>
                                </div>

                                <span
                                    className={
                                        styles["thoughts-development__date"]
                                    }
                                >
                                    {thought.createdAt}
                                </span>

                                <motion.span
                                    className={
                                        styles["thoughts-development__arrow"]
                                    }
                                    whileHover={
                                        shouldReduceMotion
                                            ? undefined
                                            : {
                                                  scale: animation.hover.arrowScale,
                                                  rotate: animation.hover.arrowRotation,
                                              }
                                    }
                                    transition={{
                                        duration: animation.hover.duration,
                                        ease: animation.easing,
                                    }}
                                    aria-hidden="true"
                                >
                                    <ArrowRightUp />
                                </motion.span>
                            </Link>
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
        </section>
    );
};

"use client";

import { motion, useReducedMotion } from "framer-motion";

import { animation, labels } from "../../../model/animations";

import styles from "../../styles/experience.module.scss";

export const ExperienceHeader = () => {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.header
            className={styles["experience__heading"]}
            initial={
                shouldReduceMotion
                    ? false
                    : {
                          opacity: 0,
                          y: animation.heading.offsetY,
                      }
            }
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

            <div className={styles["experience__heading-main"]}>
                <h2 id="experience-title">{labels.heading}</h2>

                <p>
                    {labels.subtitle[0]}
                    <br />
                    {labels.subtitle[1]}
                </p>
            </div>

            <div className={styles["experience__heading-bottom"]}>
                <span>{labels.sectionDescription}</span>
                <span>{labels.sectionIndex}</span>
            </div>
        </motion.header>
    );
};

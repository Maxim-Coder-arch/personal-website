"use client";

import { motion, useReducedMotion } from "framer-motion";

import { animation, containerVariantsExperienceGrid } from "../../../model/animations";
import { experience } from "../../../model/data";

import { ExperienceCard } from "./experience-card";

import styles from "../../styles/experience.module.scss";

export const ExperienceGrid = () => {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            className={styles["experience__grid"]}
            variants={
                shouldReduceMotion
                    ? undefined
                    : containerVariantsExperienceGrid
            }
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{
                once: animation.once,
                amount: animation.cards.viewportAmount,
            }}
        >
            {experience.map((item, index) => (
                <ExperienceCard
                    key={item.id}
                    experience={item}
                    index={index}
                    shouldReduceMotion={shouldReduceMotion}
                />
            ))}
        </motion.div>
    );
};
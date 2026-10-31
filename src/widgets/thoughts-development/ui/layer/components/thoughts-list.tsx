
"use client";

import { motion, useReducedMotion } from "framer-motion";

import { listVariants, THOUGHTS_CONFIG } from "../../../model/animations";
import { thoughts } from "../../../model/data";

import { ThoughtsListItem } from "./thoughts-list-item";

import styles from "../../styles/thoughts-development.module.scss";

export const ThoughtsList = () => {
    const shouldReduceMotion = useReducedMotion();

    return (
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
                once: THOUGHTS_CONFIG.animation.once,
                amount: THOUGHTS_CONFIG.animation.list.viewportAmount,
            }}
        >
            {thoughts.map((thought, index) => (
                <ThoughtsListItem
                    key={thought.id}
                    thought={thought}
                    index={index}
                    shouldReduceMotion={shouldReduceMotion}
                />
            ))}
        </motion.ul>
    );
};
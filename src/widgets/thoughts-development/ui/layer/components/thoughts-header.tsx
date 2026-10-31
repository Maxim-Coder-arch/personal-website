"use client";

import { motion, useReducedMotion } from "framer-motion";

import { THOUGHTS_CONFIG } from "../../../model/animations";

import styles from "../../styles/thoughts-development.module.scss";

export const ThoughtsHeader = () => {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.header
            className={styles["thoughts-development__heading"]}
            initial={
                shouldReduceMotion
                    ? false
                    : {
                          opacity: 0,
                          y: THOUGHTS_CONFIG.animation.heading.offsetY,
                      }
            }
            whileInView={{
                opacity: 1,
                y: 0,
            }}
            viewport={{
                once: THOUGHTS_CONFIG.animation.once,
                amount: THOUGHTS_CONFIG.animation.heading.viewportAmount,
            }}
            transition={{
                duration: shouldReduceMotion
                    ? 0
                    : THOUGHTS_CONFIG.animation.heading.duration,
                ease: THOUGHTS_CONFIG.animation.easing,
            }}
        >
            <h2 id="thoughts-title">
                Thoughts <br />
                on development
            </h2>
        </motion.header>
    );
};
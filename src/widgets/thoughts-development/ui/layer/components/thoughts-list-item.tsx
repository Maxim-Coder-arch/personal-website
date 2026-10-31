"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import { ArrowRightUp } from "@/src/shared/icons/arrowes/arrow-right-up";

import { itemVariants, THOUGHTS_CONFIG } from "../../../model/animations";
import { ThoughtsListItemProps } from "../../../model/types";

import styles from "../../styles/thoughts-development.module.scss";

export const ThoughtsListItem = ({
    thought,
    index,
    shouldReduceMotion,
}: ThoughtsListItemProps) => {
    return (
        <motion.li
            className={styles["thoughts-development__list-item"]}
            variants={
                shouldReduceMotion
                    ? undefined
                    : itemVariants
            }
        >
            <Link
                href={`/thoughts/${thought.id}`}
                className={styles["thoughts-development__link"]}
            >
                <div className={styles["thoughts-development__content"]}>
                    <div className={styles["thoughts-development__title"]}>
                        <span className={styles["thoughts-development__number"]}>
                            {String(index + 1).padStart(2, "0")}
                        </span>

                        <h3>{thought.title}</h3>
                    </div>

                    <p>{thought.subtitle}</p>
                </div>

                <motion.span
                    className={styles["thoughts-development__arrow"]}
                    whileHover={
                        shouldReduceMotion
                            ? undefined
                            : {
                                  scale: THOUGHTS_CONFIG.animation.hover.arrowScale,
                                  rotate: THOUGHTS_CONFIG.animation.hover.arrowRotation,
                              }
                    }
                    transition={{
                        duration: THOUGHTS_CONFIG.animation.hover.duration,
                        ease: THOUGHTS_CONFIG.animation.easing,
                    }}
                    aria-hidden="true"
                >
                    <ArrowRightUp />
                </motion.span>
            </Link>
        </motion.li>
    );
};
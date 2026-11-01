"use client";

import { motion, useReducedMotion } from "framer-motion";

import { ReactChildren } from "@/src/shared/types/global-types";

import { SCENIC_ANIMATION } from "../../../model/animations";

import { getAnimationProps } from "../../../lib/helpers/animations";

import styles from "../../styles/scenic.module.scss";

export const ScenicLayout = ({ children }: ReactChildren) => {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section id="scenic" aria-label="Contact information">
            <div
                className={`
                    ${styles["scenic"]}
                    min-h-screen py-8 px-6
                    flex flex-col justify-center items-center
                `}
            >
                <motion.div
                    className={styles["scenic__part"]}
                    {...getAnimationProps(0, shouldReduceMotion)}
                >
                    <h3>Websites&</h3>
                </motion.div>

                <div className={styles["scenic__part"]}>
                    <motion.div
                        className={styles["scenic__title"]}
                        {...getAnimationProps(SCENIC_ANIMATION.delay, shouldReduceMotion)}
                    >
                        <h3>Branding</h3>
                    </motion.div>

                    {children}
                </div>
            </div>
        </section>
    );
};
"use client";

import { motion, useReducedMotion } from "framer-motion";

import { ArrowRightUp } from "@/src/shared/icons/arrowes/arrow-right-up";

import styles from "../styles/scenic.module.scss";

const SCENIC_ANIMATION = {
    duration: 1,
    linkDuration: 0.7,
    delay: 0.2,
    viewportAmount: 0.2,
    easing: [0.22, 1, 0.36, 1] as const,
};

export const Scenic = () => {
    const shouldReduceMotion = useReducedMotion();

    const getAnimationProps = (delay = 0) => ({
        initial: shouldReduceMotion ? false : {
            opacity: 0,
            y: 45,
        },
        whileInView: {
            opacity: 1,
            y: 0,
        },
        viewport: {
            once: true,
            amount: SCENIC_ANIMATION.viewportAmount,
        },
        transition: {
            duration: shouldReduceMotion ? 0 : SCENIC_ANIMATION.duration,
            delay: shouldReduceMotion ? 0 : delay,
            ease: SCENIC_ANIMATION.easing,
        },
    });

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
                    {...getAnimationProps()}
                >
                    <h3>Websites&</h3>
                </motion.div>

                <div className={styles["scenic__part"]}>
                    <motion.div
                        className={styles["scenic__title"]}
                        {...getAnimationProps(SCENIC_ANIMATION.delay)}
                    >
                        <h3>Branding</h3>
                    </motion.div>

                    <motion.a
                        href="https://t.me/Stxxxvans"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles["scenic__contact"]}
                        {...getAnimationProps(SCENIC_ANIMATION.delay + 0.3)}
                        whileHover={
                            shouldReduceMotion
                                ? undefined
                                : {
                                    scale: 1.04,
                                    y: -3,
                                }
                        }
                    >
                        <span>@Stxxxvans</span>
                        <ArrowRightUp />
                    </motion.a>
                </div>
            </div>
        </section>
    );
};
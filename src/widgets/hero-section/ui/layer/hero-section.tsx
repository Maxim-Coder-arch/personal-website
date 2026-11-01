"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";


import styles from "../styles/hero-section.module.scss";

export const HeroSection = () => {
    const shouldReduceMotion = useReducedMotion();

    const initialState = shouldReduceMotion ? false : "hidden";

    const contentVariants = {
        hidden: {
            opacity: 0,
            y: 35,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1] as const,
            },
        },
    };

    const imageVariants = {
        hidden: {
            opacity: 0,
            scale: 1.04,
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1.2,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1] as const,
            },
        },
    };

    return (
            <section className={styles["hero"]} id="top">
                <motion.div
                    className={styles["hero__background"]}
                    aria-hidden="true"
                >
                    {Array.from({length: 5}).map((_, index) => {
                        return <motion.span 
                            initial={contentVariants.hidden}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{delay: .1 * index}}
                            key={index}
                        >PORTFOLIO</motion.span>
                    })}
                    
                </motion.div>

                <div className={styles["hero__main"]}>
                    <motion.div
                        className={styles["hero__identity"]}
                        initial={initialState}
                        animate="visible"
                        variants={contentVariants}
                    >
                        <span className={styles["hero__eyebrow"]}>
                            MAXIM NOVIKOV — FRONTEND DEVELOPER
                        </span>

                        <h1>
                            <span>MAXIM</span>
                            <span>
                                NOVIKOV<span className={styles["hero__dot"]}>.</span>
                            </span>
                        </h1>
                    </motion.div>

                    <motion.div
                        className={styles["hero__portrait"]}
                        initial={initialState}
                        animate="visible"
                        variants={imageVariants}
                    >
                        <Image
                            src="/images/hero-screen.png"
                            alt="Maxim Novikov"
                            fill
                            priority
                            sizes="(max-width: 768px) 75vw, 35vw"
                            className={styles["hero__image"]}
                        />

                        <div className={styles["hero__introduction"]}>
                            <p>
                                Design & Code for
                                <br />
                                Meaningful Experiences
                            </p>

                            <span>BASED ON CREATIVITY & TECHNOLOGY</span>
                        </div>
                    </motion.div>

                </div>
            </section>
    );
};
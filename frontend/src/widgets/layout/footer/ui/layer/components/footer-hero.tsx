"use client";

import { motion } from "framer-motion";

import {
    BAR_VARIANTS,
    FADE_VARIANTS,
    HERO_VARIANTS,
    LINE_VARIANTS,
} from "../../../model/animations";
import type { FooterHeroProps } from "../../../model/types";

import { FooterMagnet } from "./footer-magnet";

import styles from "../../styles/footer.module.scss";

export const FooterHero = ({
    eyebrow,
    titleTop,
    titleBottom,
    highlight,
    ctaLabel,
    ctaHref,
}: FooterHeroProps) => {
    return (
        <motion.div
            className={styles["footer__hero"]}
            variants={HERO_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <div>
                <motion.span
                    className={styles["footer__eyebrow"]}
                    variants={FADE_VARIANTS}
                >
                    {eyebrow}
                </motion.span>

                <h2 className={styles["footer__title"]}>
                    <span className={styles["footer__line"]}>
                        <motion.span
                            className={styles["footer__line-inner"]}
                            variants={LINE_VARIANTS}
                        >
                            {titleTop}
                        </motion.span>
                    </span>

                    <span className={styles["footer__line"]}>
                        <motion.span
                            className={styles["footer__line-inner"]}
                            variants={LINE_VARIANTS}
                        >
                            {titleBottom}{" "}
                            <span className={styles["footer__mark"]}>
                                <motion.span
                                    className={styles["footer__mark-bar"]}
                                    variants={BAR_VARIANTS}
                                />
                                {highlight}
                            </span>
                        </motion.span>
                    </span>
                </h2>
            </div>

            <motion.div variants={FADE_VARIANTS}>
                <FooterMagnet href={ctaHref} label={ctaLabel} />
            </motion.div>
        </motion.div>
    );
};
"use client";

import { useMemo } from "react";

import { motion } from "framer-motion";

import {
    SPLIT_PIECE_VARIANTS,
    splitContainerVariants,
} from "../../model/animations";
import type { SplitRevealProps } from "../../model/types";

import styles from "../styles/split-reveal.module.scss";

export const SplitReveal = ({
    text,
    unit = "letter",
    stagger = 0.045,
    delay = 0,
    className = "",
}: SplitRevealProps) => {
    const variants = useMemo(
        () => splitContainerVariants(stagger, delay),
        [stagger, delay],
    );

    const pieces = unit === "word" ? text.split(" ") : Array.from(text);

    return (
        <motion.span
            className={`${styles["split-reveal"]} ${
                unit === "word" ? styles["split-reveal--words"] : ""
            } ${className}`}
            variants={variants}
        >
            <span className="sr-only">{text}</span>

            {pieces.map((piece, index) => (
                <span
                    key={`${piece}-${index}`}
                    className={styles["split-reveal__mask"]}
                    aria-hidden="true"
                >
                    <motion.span
                        className={styles["split-reveal__piece"]}
                        variants={SPLIT_PIECE_VARIANTS}
                    >
                        {piece === " " ? "\u00A0" : piece}
                    </motion.span>
                </span>
            ))}
        </motion.span>
    );
};
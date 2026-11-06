"use client";

import { motion, useTransform } from "framer-motion";

import { LIT } from "../../../model/config";
import type { ScrollWordProps } from "../../../model/types";

import styles from "../../styles/closing-section.module.scss";

export const ScrollWord = ({
    text,
    index,
    total,
    progress,
}: ScrollWordProps) => {
    const start = (index / total) * LIT.spread;
    const end = start + LIT.window;

    const opacity = useTransform(progress, [start, end], [LIT.dimmed, 1]);

    return (
        <motion.span
            className={styles["closing__word"]}
            style={{ opacity }}
        >
            {text}
        </motion.span>
    );
};
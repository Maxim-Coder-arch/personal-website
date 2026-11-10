"use client";

import { useRef } from "react";

import { motion, useSpring, useTransform } from "framer-motion";

import { LETTER_VARIANTS } from "../../../model/animations";
import { FAR, LETTER_LIFT, LETTER_RADIUS, LETTER_SPRING } from "../../../model/config";
import type { FooterLetterProps } from "../../../model/types";

import styles from "../../styles/footer.module.scss";

export const FooterLetter = ({ char, pointerX }: FooterLetterProps) => {
    const ref = useRef<HTMLSpanElement>(null);

    const raw = useTransform(pointerX, (x) => {
        const node = ref.current;

        if (!node || x === FAR) return 0;

        const rect = node.getBoundingClientRect();
        const distance =
            Math.abs(x - (rect.left + rect.width / 2)) / LETTER_RADIUS;

        return -(Math.max(0, 1 - distance) ** 2) * LETTER_LIFT;
    });

    const smooth = useSpring(raw, LETTER_SPRING);
    const y = useTransform(smooth, (value) => `${value}%`);

    return (
        <motion.span
            ref={ref}
            className={styles["footer__letter"]}
            variants={LETTER_VARIANTS}
        >
            <motion.span className={styles["footer__letter-glyph"]} style={{ y }}>
                {char}
            </motion.span>
        </motion.span>
    );
};
"use client";

import { useRef } from "react";
import type { PointerEvent } from "react";

import {
    motion,
    useMotionValue,
    useReducedMotion,
    useSpring,
} from "framer-motion";

import { WORDMARK_VARIANTS } from "../../../model/animations";
import { BLOB_FADE_SPRING, BLOB_SPRING, FAR } from "../../../model/config";
import type { FooterWordmarkProps } from "../../../model/types";

import { FooterLetter } from "./footer-letter";

import styles from "../../styles/footer.module.scss";

export const FooterWordmark = ({ text }: FooterWordmarkProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();

    const pointerX = useMotionValue(FAR);
    const blobX = useMotionValue(0);
    const blobY = useMotionValue(0);
    const blobOpacity = useMotionValue(0);

    const springX = useSpring(blobX, BLOB_SPRING);
    const springY = useSpring(blobY, BLOB_SPRING);
    const springOpacity = useSpring(blobOpacity, BLOB_FADE_SPRING);

    const handleMove = (event: PointerEvent<HTMLDivElement>) => {
        const node = ref.current;

        if (!node || shouldReduceMotion) return;

        const rect = node.getBoundingClientRect();

        pointerX.set(event.clientX);
        blobX.set(event.clientX - rect.left);
        blobY.set(event.clientY - rect.top);
        blobOpacity.set(1);
    };

    const handleLeave = () => {
        pointerX.set(FAR);
        blobOpacity.set(0);
    };

    return (
        <motion.div
            ref={ref}
            role="img"
            aria-label={text}
            className={styles["footer__wordmark"]}
            variants={WORDMARK_VARIANTS}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            onPointerMove={handleMove}
            onPointerLeave={handleLeave}
        >
            <motion.span
                className={styles["footer__blob"]}
                style={{ x: springX, y: springY, opacity: springOpacity }}
            />

            {Array.from(text).map((char, index) =>
                char === " " ? (
                    <span key={index} className={styles["footer__space"]} />
                ) : (
                    <FooterLetter key={index} char={char} pointerX={pointerX} />
                ),
            )}
        </motion.div>
    );
};
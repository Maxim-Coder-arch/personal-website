"use client";

import type { PointerEvent } from "react";

import { motion, useMotionValue, useSpring } from "framer-motion";

import { ArrowRightUp } from "@/src/shared/icons/arrowes/arrow-right-up";

import { MAGNET_SPRING, MAGNET_STRENGTH } from "../../../model/config";
import type { FooterMagnetProps } from "../../../model/types";

import styles from "../../styles/footer.module.scss";

export const FooterMagnet = ({ href, label }: FooterMagnetProps) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, MAGNET_SPRING);
    const springY = useSpring(y, MAGNET_SPRING);

    const handleMove = (event: PointerEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();

        x.set(
            (event.clientX - (rect.left + rect.width / 2)) * MAGNET_STRENGTH,
        );
        y.set(
            (event.clientY - (rect.top + rect.height / 2)) * MAGNET_STRENGTH,
        );
    };

    const handleLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div
            className={styles["footer__magnet-zone"]}
            onPointerMove={handleMove}
            onPointerLeave={handleLeave}
        >
            <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles["footer__magnet"]}
                style={{ x: springX, y: springY }}
            >
                <span className={styles["footer__magnet-label"]}>{label}</span>
                <ArrowRightUp />
            </motion.a>
        </div>
    );
};
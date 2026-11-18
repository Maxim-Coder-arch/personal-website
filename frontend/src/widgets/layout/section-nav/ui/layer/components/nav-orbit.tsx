"use client";

import { motion } from "framer-motion";

import type { NavOrbitProps } from "../../../model/types";

import styles from "../../styles/section-nav.module.scss";

export const NavOrbit = ({ geometry, handAngle, fill }: NavOrbitProps) => {
    const { radius, sweep } = geometry;
    const radians = (sweep * Math.PI) / 180;
    const endX = -radius * Math.cos(radians);
    const endY = -radius * Math.sin(radians);
    const path = `M ${-radius} 0 A ${radius} ${radius} 0 0 1 ${endX} ${endY}`;

    return (
        <>
            <svg
                className={styles["orbit"]}
                width="1"
                height="1"
                viewBox="0 0 1 1"
                aria-hidden="true"
            >
                <path className={styles["orbit__track"]} d={path} />
                <motion.path
                    className={styles["orbit__fill"]}
                    d={path}
                    style={{ pathLength: fill }}
                />
            </svg>

            <motion.span
                className={styles["orbit__hand"]}
                style={{ width: radius, rotate: handAngle }}
                aria-hidden="true"
            />
        </>
    );
};
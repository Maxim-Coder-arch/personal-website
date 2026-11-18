"use client";

import { motion } from "framer-motion";

import type { NavTriggerProps } from "../../../model/types";

import styles from "../../styles/section-nav.module.scss";

export const NavTrigger = ({
    open,
    progress,
    label,
    controls,
    onClick,
}: NavTriggerProps) => {
    return (
        <button
            type="button"
            className={[styles["trigger"], open ? styles["trigger--open"] : ""].join(" ")}
            aria-label={label}
            aria-expanded={open}
            aria-controls={controls}
            onClick={onClick}
        >
            <svg className={styles["trigger__ring"]} viewBox="0 0 56 56" aria-hidden="true">
                <motion.circle
                    className={styles["trigger__progress"]}
                    cx="28"
                    cy="28"
                    r="27"
                    style={{ pathLength: progress }}
                />
            </svg>

            <span className={styles["trigger__burger"]} aria-hidden="true">
                <span className={`${styles["trigger__bar"]} ${styles["trigger__bar--top"]}`} />
                <span className={`${styles["trigger__bar"]} ${styles["trigger__bar--mid"]}`} />
                <span className={`${styles["trigger__bar"]} ${styles["trigger__bar--low"]}`} />
            </span>
        </button>
    );
};
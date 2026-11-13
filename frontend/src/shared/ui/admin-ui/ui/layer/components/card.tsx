"use client";

import { motion } from "framer-motion";

import { getCardMotion } from "../../../model/animations";
import type { AdminCardProps } from "../../../model/types";

import styles from "../../styles/admin-ui.module.scss";

export const AdminCard = ({
    title,
    action,
    compact,
    delay = 0,
    children,
}: AdminCardProps) => {
    return (
        <motion.section
            className={[styles["card"], compact ? styles["card--compact"] : ""].join(" ")}
            {...getCardMotion(delay)}
        >
            {(title || action) && (
                <div className={styles["card__head"]}>
                    {title && <h2 className={styles["card__title"]}>{title}</h2>}
                    {action}
                </div>
            )}

            {children}
        </motion.section>
    );
};
"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import styles from "./admin-ui.module.scss";

type AdminCardProps = {
  title?: string;
  action?: ReactNode;
  compact?: boolean;
  delay?: number;
  children: ReactNode;
};

export function AdminCard({ title, action, compact, delay = 0, children }: AdminCardProps) {
  return (
    <motion.section
      className={[styles["card"], compact ? styles["card--compact"] : ""].join(" ")}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
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
}
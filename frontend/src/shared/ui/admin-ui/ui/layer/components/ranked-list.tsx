"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import styles from "../../styles/admin-ui.module.scss";

export type RankedItem = {
  id: string;
  label: ReactNode;
  value: string;
  ratio: number;
};

type RankedListProps = {
  items: RankedItem[];
};

export function RankedList({ items }: RankedListProps) {
  return (
    <div className={styles["ranked"]}>
      {items.map((item, index) => (
        <div key={item.id} className={styles["ranked__row"]}>
          <div className={styles["ranked__line"]}>
            <span className={styles["ranked__label"]}>{item.label}</span>
            <span className={styles["ranked__value"]}>{item.value}</span>
          </div>
          <div className={styles["ranked__track"]}>
            <motion.span
              className={styles["ranked__bar"]}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: Math.min(1, Math.max(0.02, item.ratio)) }}
              transition={{ duration: 0.6, delay: index * 0.04, ease: "easeOut" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function RankedText({ children }: { children: ReactNode }) {
  return <span className={styles["ranked__text"]}>{children}</span>;
}
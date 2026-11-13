"use client";

import { motion } from "framer-motion";
import styles from "../../styles/admin-ui.module.scss";

type SegmentedOption<T extends string> = {
  id: T;
  label: string;
};

type SegmentedProps<T extends string> = {
  options: readonly SegmentedOption<T>[];
  value: T;
  onChange: (id: T) => void;
  layoutId: string;
};

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  layoutId,
}: SegmentedProps<T>) {
  return (
    <div className={styles["segmented"]} role="tablist">
      {options.map((option) => {
        const active = option.id === value;

        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={active}
            className={[
              styles["segmented__item"],
              active ? styles["segmented__item--active"] : "",
            ].join(" ")}
            onClick={() => onChange(option.id)}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className={styles["segmented__pill"]}
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
              />
            )}
            <span className={styles["segmented__label"]}>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
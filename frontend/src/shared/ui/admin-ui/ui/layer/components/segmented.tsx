"use client";

import { motion } from "framer-motion";

import { PILL_TRANSITION } from "../../../model/animations";
import type { SegmentedProps } from "../../../model/types";

import styles from "../../styles/admin-ui.module.scss";

export const Segmented = <T extends string>({
    options,
    value,
    onChange,
    layoutId,
}: SegmentedProps<T>) => {
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
                                transition={PILL_TRANSITION}
                            />
                        )}
                        <span className={styles["segmented__label"]}>{option.label}</span>
                    </button>
                );
            })}
        </div>
    );
};
"use client";

import { motion } from "framer-motion";

import { ReactChildren } from "@/src/shared/types/global-types";

import { getRankedBarMotion } from "../../../model/animations";
import type { RankedListProps } from "../../../model/types";

import styles from "../../styles/admin-ui.module.scss";

export const RankedList = ({ items }: RankedListProps) => {
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
                            {...getRankedBarMotion(item.ratio, index)}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export const RankedText = ({ children }: ReactChildren) => {
    return <span className={styles["ranked__text"]}>{children}</span>;
};
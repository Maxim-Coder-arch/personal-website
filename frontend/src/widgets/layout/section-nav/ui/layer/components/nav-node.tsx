"use client";

import { useMemo } from "react";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { getNodeVariants } from "../../../model/animations";
import type { NavNodeProps } from "../../../model/types";

import styles from "../../styles/section-nav.module.scss";

export const NavNode = ({
    item,
    index,
    layout,
    active,
    open,
    reduceMotion,
    onSelect,
}: NavNodeProps) => {
    const t = useTranslations("sectionNav.items");
    const variants = useMemo(() => getNodeVariants(reduceMotion), [reduceMotion]);

    return (
        <motion.li
            className={styles["node"]}
            variants={variants}
            custom={{ x: layout.x, y: layout.y, index }}
            initial="closed"
            animate={open ? "open" : "closed"}
        >
            <button
                type="button"
                className={[
                    styles["node__button"],
                    active ? styles["node__button--active"] : "",
                ].join(" ")}
                aria-current={active ? "location" : undefined}
                onClick={() => onSelect(item.id)}
            >
                <span className={styles["node__dot"]} aria-hidden="true" />

                <span className={styles["node__label"]}>
                    <span className={styles["node__index"]}>
                        {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{t(item.key)}</span>
                </span>
            </button>
        </motion.li>
    );
};
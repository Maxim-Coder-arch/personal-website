import {
    menuAnimationConfig,
    menuColorAnimation,
} from "../../../model/animations";
import type { AnimatedListItemProps } from "../../../model/types";

import Link from "next/link";
import { motion } from "framer-motion";

import styles from "../../styles/menu.module.scss";

export const AnimatedListItem = ({
    item,
    isActive,
    isHighlighted,
    shouldReduceMotion,
    onMouseEnter,
}: AnimatedListItemProps) => {
    return (
        <motion.li
            className={`${styles["hero-nav__item"]} flex rounded-3xl px-4 py-2 gap-1 ${
                isActive ? styles["active"] : ""
            }`}
            variants={menuAnimationConfig.items}
            onMouseEnter={onMouseEnter}
            whileHover={
                shouldReduceMotion
                    ? undefined
                    : menuAnimationConfig.itemHover
            }
            animate={
                isHighlighted
                    ? menuColorAnimation.active
                    : menuColorAnimation.inactive
            }
        >
            {isHighlighted && (
                <motion.span
                    layoutId="menu-active-bubble"
                    className={styles["hero-nav__bubble"]}
                    transition={
                        shouldReduceMotion
                            ? { duration: 0 }
                            : menuAnimationConfig.bubble.layout
                    }
                />
            )}

            <Link
                href={item.itemLink}
                aria-current={isActive ? "page" : undefined}
                className={styles["hero-nav__link"]}
            >
                {item.itemIcon && (
                    <motion.span
                        className={styles["hero-nav__icon"]}
                        whileHover={
                            shouldReduceMotion
                                ? undefined
                                : menuAnimationConfig.iconHover
                        }
                    >
                        {item.itemIcon}
                    </motion.span>
                )}

                <span className={styles["hero-nav__label"]}>
                    {item.itemLabel}
                </span>
            </Link>
        </motion.li>
    );
};
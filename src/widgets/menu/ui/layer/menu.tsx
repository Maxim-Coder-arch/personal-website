
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

import styles from "../styles/menu.module.scss";


import { menuAnimationConfig, menuColorAnimation } from "../../model/animations";
import { menuItems } from "../../model/data";



export const Menu = () => {
    const pathName = usePathname();
    const shouldReduceMotion = useReducedMotion();

    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const currentPath = pathName ?? "/";
    const highlightedPath = hoveredItem ?? currentPath;

    return (
        <motion.nav
            className={`${styles["hero-nav"]} w-full fixed flex justify-center`}
            initial={
                shouldReduceMotion
                    ? false
                    : menuAnimationConfig.appearance.initial
            }
            animate={menuAnimationConfig.appearance.animate}
        >
            <div
                className={`${styles["hero-nav__sections"]} rounded-3xl flex justify-center p-1`}
                onMouseLeave={() => setHoveredItem(null)}
            >
                <motion.ul
                    className="flex items-center gap-2"
                    variants={menuAnimationConfig.list}
                    initial={shouldReduceMotion ? false : "hidden"}
                    animate="visible"
                >
                    {menuItems.map((item) => {
                        const isActive = currentPath === item.itemLink;
                        const isHighlighted = highlightedPath === item.itemLink;

                        return (
                            <motion.li
                                key={item.itemLink}
                                className={`${styles["hero-nav__item"]} flex rounded-3xl px-4 py-2 gap-1 ${
                                    isActive ? styles["active"] : ""
                                }`}
                                variants={menuAnimationConfig.items}
                                onMouseEnter={() => setHoveredItem(item.itemLink)}
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
                    })}
                </motion.ul>
            </div>
        </motion.nav>
    );
};

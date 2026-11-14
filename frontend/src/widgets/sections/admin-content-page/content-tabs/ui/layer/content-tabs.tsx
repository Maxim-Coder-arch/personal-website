"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { PILL_TRANSITION } from "@/src/shared/ui/admin-ui";

import { useContentTabs } from "../../lib/hooks/use-content-tabs";
import { CONTENT_TABS_PILL_ID } from "../../model/data";

import styles from "../styles/content-tabs.module.scss";

export const ContentTabs = () => {
    const tabs = useContentTabs();

    return (
        <nav className={styles["tabs"]} aria-label="Разделы контента">
            {tabs.map((tab) => {
                if (!tab.ready) {
                    return (
                        <span
                            key={tab.id}
                            aria-disabled
                            className={[styles["tab"], styles["tab--disabled"]].join(" ")}
                        >
                            {tab.label}
                            <span className={styles["tab__badge"]}>скоро</span>
                        </span>
                    );
                }

                return (
                    <Link
                        key={tab.id}
                        href={tab.href}
                        className={[styles["tab"], tab.active ? styles["tab--active"] : ""].join(" ")}
                    >
                        {tab.active && (
                            <motion.span
                                layoutId={CONTENT_TABS_PILL_ID}
                                className={styles["tab__pill"]}
                                transition={PILL_TRANSITION}
                            />
                        )}
                        <span className={styles["tab__label"]}>{tab.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
};
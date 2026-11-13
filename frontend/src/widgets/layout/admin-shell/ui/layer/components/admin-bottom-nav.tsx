"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { PILL_TRANSITION } from "@/src/shared/ui/admin-ui";

import { useAdminNav } from "../../../lib/hooks/use-admin-nav";
import { BOTTOM_PILL_ID } from "../../../model/animations";

import styles from "../../styles/admin-shell.module.scss";

export const AdminBottomNav = () => {
    const { items } = useAdminNav();

    return (
        <nav className={styles["bottom-nav"]}>
            {items.map((item) => {
                const Icon = item.icon;

                const content = (
                    <>
                        {item.active && (
                            <motion.span
                                layoutId={BOTTOM_PILL_ID}
                                className={styles["bottom-nav__pill"]}
                                transition={PILL_TRANSITION}
                            />
                        )}
                        <span className={styles["bottom-nav__content"]}>
                            <Icon size={20} />
                            {item.label}
                        </span>
                    </>
                );

                if (!item.ready) {
                    return (
                        <div
                            key={item.id}
                            aria-disabled
                            className={[
                                styles["bottom-nav__item"],
                                styles["bottom-nav__item--disabled"],
                            ].join(" ")}
                        >
                            {content}
                        </div>
                    );
                }

                return (
                    <Link
                        key={item.id}
                        href={item.href}
                        className={[
                            styles["bottom-nav__item"],
                            item.active ? styles["bottom-nav__item--active"] : "",
                        ].join(" ")}
                    >
                        {content}
                    </Link>
                );
            })}
        </nav>
    );
};
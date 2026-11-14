"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { AdminLogoutButton } from "@/src/features/admin-auth";
import { PILL_TRANSITION } from "@/src/shared/ui/admin-ui";

import { useAdminNav } from "../../../lib/hooks/use-admin-nav";
import { SIDEBAR_PILL_ID } from "../../../model/animations";
import type { AdminSidebarProps } from "../../../model/types";

import { ADMIN_SITE_LINK } from "../../../model/data";

import styles from "../../styles/admin-shell.module.scss";

export const AdminSidebar = ({ email }: AdminSidebarProps) => {
    const { items } = useAdminNav();

    return (
        <aside className={styles["sidebar"]}>
            <div className={styles["brand"]}>
                Maxim<span>.</span>admin
            </div>

            <nav className={styles["nav"]}>
                {items.map((item) => {
                    const Icon = item.icon;

                    const content = (
                        <>
                            {item.active && (
                                <motion.span
                                    layoutId={SIDEBAR_PILL_ID}
                                    className={styles["nav-item__pill"]}
                                    transition={PILL_TRANSITION}
                                />
                            )}
                            <span className={styles["nav-item__content"]}>
                                <Icon size={18} />
                                {item.label}
                                {!item.ready && (
                                    <span className={styles["nav-item__badge"]}>скоро</span>
                                )}
                            </span>
                        </>
                    );

                    if (!item.ready) {
                        return (
                            <div
                                key={item.id}
                                aria-disabled
                                className={[
                                    styles["nav-item"],
                                    styles["nav-item--disabled"],
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
                                styles["nav-item"],
                                item.active ? styles["nav-item--active"] : "",
                            ].join(" ")}
                        >
                            {content}
                        </Link>
                    );
                })}
            </nav>

            <Link href={ADMIN_SITE_LINK.href} className={styles["site-link"]}>
                <span>{ADMIN_SITE_LINK.label}</span>
                <ArrowUpRight size={16} />
            </Link>

            <div className={styles["account"]}>
                <span>{email}</span>
                <AdminLogoutButton />
            </div>
        </aside>
    );
};
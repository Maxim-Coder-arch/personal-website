"use client";

import { motion } from "framer-motion";

import { Toaster } from "sonner";

import { useAdminNav } from "../../lib/hooks/use-admin-nav";
import { contentMotion } from "../../model/animations";
import type { AdminShellProps } from "../../model/types";

import { AdminBottomNav } from "./components/admin-bottom-nav";
import { AdminSidebar } from "./components/admin-sidebar";
import { AdminTopbar } from "./components/admin-topbar";

import styles from "../styles/admin-shell.module.scss";

export const AdminShell = ({ email, children }: AdminShellProps) => {
    const { pathname } = useAdminNav();

    return (
        <>
            <Toaster theme="dark" position="top-right" />

            <div className={styles["root"]}>
                <AdminSidebar email={email} />

                <div className={styles["main"]}>
                    <AdminTopbar />

                    <motion.main
                        key={pathname}
                        className={styles["content"]}
                        {...contentMotion}
                    >
                        {children}
                    </motion.main>
                </div>

                <AdminBottomNav />
            </div>
        </>
    );
};
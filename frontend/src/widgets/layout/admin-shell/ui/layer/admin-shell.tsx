"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { AdminSidebar } from "./components/admin-sidebar";
import { AdminTopbar } from "./components/admin-topbar";
import { AdminBottomNav } from "./components/admin-bottom-nav";
import styles from "../styles/admin-shell.module.scss";

type AdminShellProps = {
  email: string;
  children: ReactNode;
};

export function AdminShell({ email, children }: AdminShellProps) {
  const pathname = usePathname();

  return (
    <div className={styles["root"]}>
      <AdminSidebar email={email} />
      <div className={styles["main"]}>
        <AdminTopbar />
        <motion.main
          key={pathname}
          className={styles["content"]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {children}
        </motion.main>
      </div>
      <AdminBottomNav />
    </div>
  );
}
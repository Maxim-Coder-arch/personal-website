"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { AdminLogoutButton } from "@/src/features/admin-auth";
import { ADMIN_NAV } from "../../model/data";
import { isNavActive } from "../../lib/is-nav-active";
import styles from "../styles/admin-shell.module.scss";

type AdminSidebarProps = {
  email: string;
};

export function AdminSidebar({ email }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={styles["sidebar"]}>
      <div className={styles["brand"]}>
        Maxim<span>.</span>admin
      </div>

      <nav className={styles["nav"]}>
        {ADMIN_NAV.map((item) => {
          const Icon = item.icon;
          const active = item.ready && isNavActive(pathname, item.href);

          const content = (
            <>
              {active && (
                <motion.span
                  layoutId="admin-sidebar-pill"
                  className={styles["nav-item__pill"]}
                  transition={{ type: "spring", stiffness: 500, damping: 38 }}
                />
              )}
              <span className={styles["nav-item__content"]}>
                <Icon size={18} />
                {item.label}
                {!item.ready && <span className={styles["nav-item__badge"]}>скоро</span>}
              </span>
            </>
          );

          if (!item.ready) {
            return (
              <div
                key={item.id}
                aria-disabled
                className={[styles["nav-item"], styles["nav-item--disabled"]].join(" ")}
              >
                {content}
              </div>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href}
              className={[styles["nav-item"], active ? styles["nav-item--active"] : ""].join(" ")}
            >
              {content}
            </Link>
          );
        })}
      </nav>

      <div className={styles["account"]}>
        <span>{email}</span>
        <AdminLogoutButton />
      </div>
    </aside>
  );
}
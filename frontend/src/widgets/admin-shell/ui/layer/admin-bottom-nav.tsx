"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ADMIN_NAV } from "../../model/data";
import { isNavActive } from "../../lib/is-nav-active";
import styles from "../styles/admin-shell.module.scss";

export function AdminBottomNav() {
  const pathname = usePathname();

  return (
    <nav className={styles["bottom-nav"]}>
      {ADMIN_NAV.map((item) => {
        const Icon = item.icon;
        const active = item.ready && isNavActive(pathname, item.href);

        const content = (
          <>
            {active && (
              <motion.span
                layoutId="admin-bottom-pill"
                className={styles["bottom-nav__pill"]}
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
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
              className={[styles["bottom-nav__item"], styles["bottom-nav__item--disabled"]].join(" ")}
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
              active ? styles["bottom-nav__item--active"] : "",
            ].join(" ")}
          >
            {content}
          </Link>
        );
      })}
    </nav>
  );
}
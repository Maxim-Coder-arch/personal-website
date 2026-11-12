"use client";

import { usePathname } from "next/navigation";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { analyticsKeys } from "@/src/entities/api/analytics/analytics-queries";
import { DateRangePicker } from "@/src/features/date-range";
import { ADMIN_NAV } from "../../model/data";
import { isNavActive } from "../../lib/is-nav-active";
import styles from "../styles/admin-shell.module.scss";

export function AdminTopbar() {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const fetching = useIsFetching({ queryKey: analyticsKeys.all }) > 0;

  const title = ADMIN_NAV.find((item) => isNavActive(pathname, item.href))?.label ?? "Админка";

  return (
    <header className={styles["topbar"]}>
      <h1 className={styles["topbar__title"]}>{title}</h1>
      <div className={styles["topbar__actions"]}>
        <DateRangePicker />
        <motion.button
          type="button"
          className={styles["refresh"]}
          whileTap={{ scale: 0.9 }}
          aria-label="Обновить"
          onClick={() => queryClient.invalidateQueries({ queryKey: analyticsKeys.all })}
        >
          <RefreshCw size={16} className={fetching ? styles["refresh__icon--spin"] : undefined} />
        </motion.button>
      </div>
    </header>
  );
}
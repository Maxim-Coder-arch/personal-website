"use client";

import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

import { DateRangePicker } from "@/src/features/date-range";

import { useAdminTopbar } from "../../../lib/hooks/use-admin-topbar";
import { REFRESH_TAP } from "../../../model/animations";

import styles from "../../styles/admin-shell.module.scss";

export const AdminTopbar = () => {
    const { title, fetching, refresh } = useAdminTopbar();

    return (
        <header className={styles["topbar"]}>
            <h1 className={styles["topbar__title"]}>{title}</h1>

            <div className={styles["topbar__actions"]}>
                <DateRangePicker />

                <motion.button
                    type="button"
                    className={styles["refresh"]}
                    whileTap={REFRESH_TAP}
                    aria-label="Обновить"
                    onClick={refresh}
                >
                    <RefreshCw
                        size={16}
                        className={fetching ? styles["refresh__icon--spin"] : undefined}
                    />
                </motion.button>
            </div>
        </header>
    );
};
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { useEscapeKey } from "@/src/shared/lib/hooks/use-escape-key";
import { useMediaQuery } from "@/src/shared/lib/hooks/use-media-query";
import { useScrollLock } from "@/src/shared/lib/hooks/use-scroll-lock";

import { useDrawerFocus } from "../../../lib/hooks/use-drawer-focus";
import { DRAWER_CONFIG, backdropMotion, getDrawerPanelMotion } from "../../../model/animations";
import type { AdminDrawerProps } from "../../../model/types";

import styles from "../../styles/admin-ui.module.scss";

export const AdminDrawer = ({ open, title, onClose, children }: AdminDrawerProps) => {
    const isDesktop = useMediaQuery(DRAWER_CONFIG.desktopQuery);
    const panelRef = useDrawerFocus(open);

    useScrollLock(open);
    useEscapeKey(open, onClose);

    return (
        <AnimatePresence>
            {open && (
                <div className={styles["drawer"]}>
                    <motion.button
                        type="button"
                        aria-label="Закрыть"
                        className={styles["drawer__backdrop"]}
                        onClick={onClose}
                        {...backdropMotion}
                    />

                    <motion.aside
                        ref={panelRef}
                        role="dialog"
                        aria-modal="true"
                        aria-label={title}
                        tabIndex={-1}
                        className={styles["drawer__panel"]}
                        {...getDrawerPanelMotion(isDesktop)}
                    >
                        <header className={styles["drawer__head"]}>
                            <h2 className={styles["drawer__title"]}>{title}</h2>

                            <button
                                type="button"
                                aria-label="Закрыть"
                                className={styles["drawer__close"]}
                                onClick={onClose}
                            >
                                <X size={16} />
                            </button>
                        </header>

                        <div className={styles["drawer__body"]}>{children}</div>
                    </motion.aside>
                </div>
            )}
        </AnimatePresence>
    );
};
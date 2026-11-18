"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

import { useMediaQuery } from "@/src/shared/lib/hooks/use-media-query";

import { getPanelMotion } from "../../../model/animations";
import { SECTION_NAV_CONFIG } from "../../../model/config";

import { NavDial } from "./nav-dial";

import styles from "../../styles/section-nav.module.scss";

export const NavPanel = () => {
    const t = useTranslations("sectionNav");
    const shouldReduceMotion = useReducedMotion();
    const compact = useMediaQuery(SECTION_NAV_CONFIG.compactQuery);

    return (
        <motion.nav
            className={styles["nav"]}
            aria-label={t("label")}
            {...getPanelMotion(Boolean(shouldReduceMotion))}
        >
            <NavDial key={compact ? "compact" : "regular"} preset={compact ? "compact" : "regular"} />
        </motion.nav>
    );
};